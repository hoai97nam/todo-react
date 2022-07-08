import React, { useState, Fragment } from 'react';
import { Task } from './Task.jsx';
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '../api/TasksCollection.js';
import { TaskForm } from './TaskForm.jsx';
import { LoginForm } from './LoginForm.jsx';
import { Meteor } from 'meteor/meteor';


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

const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
  // Meteor.call('tasks.setIsChecked', _id, !isChecked);
};

const deleteTask = ({ _id }) => TasksCollection.remove(_id)

// const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);


export const App = () => {
  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }

    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }

    return TasksCollection.find(pendingOnlyFilter).count();
  });

  const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''
    }`;
  const logout = () => Meteor.logout();
  return (
    <div className='app'>
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1> 📝️  Welcome to ToDo React! {pendingTasksTitle} </h1>
          </div>
        </div>
      </header>

      <div className='main'>
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username || user.profile.name} 🚪
            </div>
            <TaskForm user={user} />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
              </button>
            </div>

            <ul className="tasks">
              {tasks.map(task => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>

    </div >
  )
}
