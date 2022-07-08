// import { Meteor } from 'meteor/meteor';
// // import { LinksCollection } from '/imports/api/links';


// function insertLink({ title, url }) {
//   LinksCollection.insert({title, url, createdAt: new Date()});
// }

// Meteor.startup(() => {
//   // If the Links collection is empty, add some data.
//   if (LinksCollection.find().count() === 0) {
//     insertLink({
//       title: 'Do the Tutorial',
//       url: 'https://www.meteor.com/tutorials/react/creating-an-app'
//     });

//     insertLink({
//       title: 'Follow the Guide',
//       url: 'http://guide.meteor.com'
//     });

//     insertLink({
//       title: 'Read the Docs',
//       url: 'https://docs.meteor.com'
//     });

//     insertLink({
//       title: 'Discussions',
//       url: 'https://forums.meteor.com'
//     });
//   }
// });

import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';

const insertTask = taskText => TasksCollection.insert({ text: taskText, createdAt: new Date() });

Meteor.startup(() => {
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
    ].forEach(insertTask)
    console.log(TasksCollection)
  }
});