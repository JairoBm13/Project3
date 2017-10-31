import { Meteor }from 'meteor/meteor'
import { Tasks } from "./tasks";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';
import faker from "faker";

if (Meteor.isServer) {
  describe('tasks', function () {

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

    describe('tasks.insert', function () {

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
        Meteor.call('tasks.insert', tempObject)

        let retreivedTask = Tasks.find({name:tempObject.name}).fetch()[0];

        assert.equal(tempObject.count, retreivedTask.count)
        assert.equal(tempObject.description, retreivedTask.description)
        assert.equal(tempObject.name, retreivedTask.name)
        assert.equal(tempObject.slogan, retreivedTask.slogan)
        assert.equal(tempObject.thumbnail, retreivedTask.thumbnail)
        assert.deepEqual(tempObject.requirements, retreivedTask.requirements)
        assert.equal(tempObject.stage, retreivedTask.stage)
      })

      it('Should throw a non-authorized error', function () {
        Meteor.user.restore();
        Meteor.userId.restore();
        resetDatabase();
        let tempObject = createTestTask();
        try {
          Meteor.call('tasks.insert', tempObject)
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

    describe('tasks.remove', function () {

      let tempId;

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

        let tempObject = createTestTask();
        tempId = Meteor.call('tasks.insert', tempObject)
      })

      afterEach(() => {
        Meteor.user.restore();
        Meteor.userId.restore();
        resetDatabase();
      });

      it('Should delete the previously inserted task/project', function () {
        Meteor.call('tasks.remove', tempId)

        let retreivedTask = Tasks.find({_id:tempId}).fetch()[0];

        assert.isUndefined(retreivedTask);
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
          Meteor.call('tasks.remove', tempId)
          assert.fail();
        } catch (err){
          assert(true, 'Should execute this line');
        }

      })
    });

  })
}