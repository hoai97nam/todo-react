import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';
// import '/imports/api/tasksMethods';

const insertTask = (taskText, user) => TasksCollection.insert({ 
  text: taskText, userId: user._id, createdAt: new Date() });

const SEED_USERNAME = '123';
const SEED_PASSWORD = '123';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    // check collection -> insert data by insert function
    [
      'Wake up',
      'Personal Hygine',
      'Have breakfast',
      'Work on computer',
      'Have lunch',
      'Run',
      'Sleep'
    ].forEach(x=>insertTask(x, user))
    console.log(TasksCollection)
  }
});

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: '', // insert your clientId here
      secret: '', // insert your secret here
    },
  }
);