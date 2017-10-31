import { Meteor }from 'meteor/meteor'
import { ideas } from "./ideas.jsx";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';
import faker from "faker";

if (Meteor.isServer) {
  describe('ideas', function () {

    function createTestIdea() {
      let obj = {
        count: faker.random.number(100),
        name: faker.name.findName(),
        slogan: faker.name.findName(),
        description: faker.lorem.sentence(),
        thumbnail: faker.image.imageUrl(),
        value: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        stage: faker.lorem.word()
      };
      return obj;
    }

    describe('ideas.insert', function () {

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

      it('Should add a new idea', function () {
        let tempObject = createTestIdea();
        let ideaId = Meteor.call('ideas.insert', tempObject)

        let foundIdea = ideas.find({_id:ideaId}).fetch()[0];

        assert.equal(tempObject.count, foundIdea.count)
        assert.equal(tempObject.description, foundIdea.description)
        assert.equal(tempObject.name, foundIdea.name)
        assert.equal(tempObject.slogan, foundIdea.slogan)
        assert.equal(tempObject.thumbnail, foundIdea.thumbnail)
        assert.deepEqual(tempObject.value, foundIdea.value)
        assert.equal(tempObject.stage, foundIdea.stage)
      })

      it('Should throw a non-authorized error', function () {
        Meteor.user.restore();
        Meteor.userId.restore();
        resetDatabase();
        let tempObject = createTestIdea();
        try {
          Meteor.call('idea.insert', tempObject)
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

    describe('ideas.remove', function () {

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

        let tempObject = createTestIdea();
        tempId = Meteor.call('ideas.insert', tempObject)
      })

      afterEach(() => {
        Meteor.user.restore();
        Meteor.userId.restore();
        resetDatabase();
      });

      it('Should delete the previously inserted idea', function () {
        Meteor.call('ideas.remove', tempId)

        let foundIdea = ideas.find({_id:tempId}).fetch()[0];

        assert.isUndefined(foundIdea);
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
          Meteor.call('ideas.remove', tempId)
          assert.fail();
        } catch (err){
          assert(true, 'Should execute this line');
        }

      })
    });

  })
}