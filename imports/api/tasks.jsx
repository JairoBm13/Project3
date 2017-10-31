import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');
// Jairo Bautista: No veo que esten utilizando este Collection
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'tasks.insert'(task) {
    check(task, Object);

    // Make sure the user is logged in before inserting a task
      if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }

    task.createdAt = new Date();
    task.owner = Meteor.userId();
    task.username = Meteor.user().username;
    task.mail = Meteor.user().mail;
    let idd =Tasks.insert(task);
    return idd;
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
    let tempTask = Tasks.find({ _id:taskId}).fetch()[0];
    // Make sure the user is logged in before inserting a task
    if (! Meteor.user() || Meteor.userId() != tempTask.owner) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },
});

