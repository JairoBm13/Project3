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
    // if (! Meteor.userId()) {
    //   throw new Meteor.Error('not-authorized');
    // }

    task.createdAt = new Date();
    task.owner = Meteor.userId();
    task.username = Meteor.user().username;
    task.mail = Meteor.user().mail;
    Tasks.insert(task);
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
});

