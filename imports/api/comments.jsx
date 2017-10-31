import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('comments', function ideasPublication(projectId) {
    if (projectId == null)
      return null;
    else
      return Comments.find({projectId : projectId+""});
  });
}

Meteor.methods({
  'comments.insert'(idea, projectId) {
    // Make sure the user is logged in before inserting a idea
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    return Comments.insert({
      text:idea,
      projectId: projectId,
      createdAt : new Date(),
      username : Meteor.user().username,
      owner : Meteor.userId(),
    });
  },
  'comments.remove'(ideaId) {
    check(ideaId, String);

    let tempComment = Comments.find({ _id:ideaId}).fetch()[0];

    Comments.update(ideaId, { $set: { checked: setChecked } });
  },
  'comments.setPrivate'(ideaId, setToPrivate) {
    // Jairo Bautista: No veo que esten utilizando este method
    check(ideaId, String);
    check(setToPrivate, Boolean);

    const idea = Comments.findOne(ideaId);

    // Make sure only the idea owner can make a idea private
    if (! Meteor.user() || tempComment.owner != Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Comments.remove(ideaId);
  },
});