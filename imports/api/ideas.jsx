import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ideas = new Mongo.Collection('ideas');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('ideas', function ideasPublication() {
    return ideas.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'ideas.insert'(idea) {
    check(idea, Object);

    // Make sure the user is logged in before inserting a idea
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }

    idea.createdAt = new Date();
    idea.owner = Meteor.userId();
    idea.username = Meteor.user().username
    return ideas.insert(idea);
  },
  'ideas.remove'(ideaId) {
    check(ideaId, String);

    ideas.remove(ideaId);
  },
  'ideas.setChecked'(ideaId, setChecked) {
    check(ideaId, String);
    check(setChecked, Boolean);

    ideas.update(ideaId, { $set: { checked: setChecked } });
  },
  'ideas.setPrivate'(ideaId, setToPrivate) {
    // Jairo Bautista: No veo que esten utilizando este method
    check(ideaId, String);
    check(setToPrivate, Boolean);

    const idea = ideas.findOne(ideaId);

    // Make sure only the idea owner can make a idea private
    if (idea.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    ideas.update(ideaId, { $set: { private: setToPrivate } });
  },
});