import { Meteor }from 'meteor/meteor'
import { Comments } from './comments.jsx'
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';
import faker from "faker";

if (Meteor.isServer) {
  describe('comments', function () {

    function createTestTask() {
      let obj = {
        count: faker.random.number(100),
        name: faker.name.findName(),
        slogan: faker.name.findName(),
        description: faker.lorem.sentence(),
        thumbnail: faker.image.imageUrl(),
        requirements: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.words()],
        stage: faker.lorem.word()
      };
      return obj;
    }

    function createTestComment() {
      return faker.lorem.sentence();
    }

    describe('comments.insert', function () {

      beforeEach(function () {
        resetDatabase();
        Factory.define('user', Meteor.users, {
          username: faker.name.findName(),
          userId: "j8H12k9l98UjL"
        });
        currentUser = Factory.create('user');
        sinon.stub(Meteor, 'user');
        sinon.stub(Meteor, 'userId');
        Meteor.userId.returns(currentUser.userId);
        Meteor.user.returns(currentUser);
      });

      afterEach(() => {
        Meteor.user.restore();
        Meteor.userId.restore();
        resetDatabase();
      });

      it('Should add a new task/project', function () {
        let tempObject = createTestTask();
        let projectId = Meteor.call('tasks.insert', tempObject)
        let tempComment = createTestComment();
        let commentId = Meteor.call('comments.insert', tempComment, projectId)

        let foundComment = Comments.find({_id: commentId}).fetch()[0];

        assert.equal(foundComment.text, tempComment)
        assert.equal(Meteor.user().username, foundComment.username)
        assert.equal(foundComment.projectId, projectId)
      })

      it('Should throw a non-authorized error', function () {
        let tempObject = createTestTask();
        let projectId = Meteor.call('tasks.insert', tempObject)
        Meteor.user.restore();
        Meteor.userId.restore();
        resetDatabase();
        try {
          let tempComment = createTestComment();
          let commentId = Meteor.call('comments.insert', tempComment, projectId)
          assert.fail();
        } catch (err){
          assert(true);
        }
        Factory.define('user', Meteor.users, {
          username: faker.name.findName(),
          userId: "j8H12k9l98UjL"
        });
        currentUser = Factory.create('user');
        sinon.stub(Meteor, 'user');
        sinon.stub(Meteor, 'userId');
        Meteor.userId.returns(currentUser.userId);
        Meteor.user.returns(currentUser);
      })
    });

    describe('comments.remove', function () {

      beforeEach(function () {
        resetDatabase();
        Factory.define('user', Meteor.users, {
          username: faker.name.findName(),
          userId: "j8H12k9l98UjL"
        });
        currentUser = Factory.create('user');
        sinon.stub(Meteor, 'user');
        sinon.stub(Meteor, 'userId');
        Meteor.userId.returns(currentUser.userId);
        Meteor.user.returns(currentUser);
      });

      afterEach(() => {
        Meteor.user.restore();
        Meteor.userId.restore();
        resetDatabase();
      });

      it('Should delete the previously inserted document', function () {
        let tempObject = createTestTask();
        let projectId = Meteor.call('tasks.insert', tempObject)
        let tempComment = createTestComment();
        let commentId = Meteor.call('comments.insert', tempComment, projectId)

        Meteor.call('comments.remove', commentId);

        let foundComment = Comments.find({_id: commentId}).fetch()[0];

        assert.isUndefined(foundComment);

      })

      it('Should throw a non-authorized error', function () {
        Meteor.user.restore();
        Meteor.userId.restore();
        resetDatabase();
        Factory.define('user', Meteor.users, {
          username: faker.name.findName(),
          userId: "j8H12k9l98Uj2"
        });
        currentUser = Factory.create('user');
        sinon.stub(Meteor, 'user');
        sinon.stub(Meteor, 'userId');
        Meteor.userId.returns(currentUser.userId);
        Meteor.user.returns(currentUser);
        try {
          let tempObject = createTestTask();
          let projectId = Meteor.call('tasks.insert', tempObject)
          let tempComment = createTestComment();
          let commentId = Meteor.call('comments.insert', tempComment, projectId)
          Meteor.call('comments.remove', commentId);

          assert.fail();
        } catch (err){
          assert(true, 'Should execute this line');
        }

      })
    });
  })
}