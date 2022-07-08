import React from 'react';
import { Task } from './Task.jsx';
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '../api/TasksCollection.js';
import { TaskForm } from './TaskForm.jsx';


// const tasks = [
//   { _id: 1, text: 'Wake up' },
//   { _id: 2, text: 'Have breakfast' },
//   { _id: 3, text: 'Work on computer' },
// ];

// export const App1 = () => (
//   <div>
//     <h1>Welcome to Meteor!</h1>
//     <ul>
//       {tasks.map(i => <Task key={i._id} task={i} />)}
//     </ul>
//     {/* <Hello />
//     <Info /> */}
//   </div>
// );

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());

  return (
    <div>
      <h1>Welcome to ToDo React!</h1>

      <TaskForm />
      <ul>
        {tasks.map(task => <Task key={task._id} task={task} />)}
      </ul>
    </div>
  )
}
