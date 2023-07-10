import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const getTasks = () => {
    axios.get('http://localhost:3001/tasks')
      .then(res => {
        console.log(res);
        setTasks(res.data);
      })
      .catch(err => console.error(err));
  };

  const addTask = () => {
    axios.post('http://localhost:3001/tasks', { task })
      .then(res => {
        console.log(res);
        getTasks();
      })
      .catch(err => console.error(err));
    setTask('');
  };

  const deleteTask = (id) => {
    const deleteConfirm = prompt('Are you sure you want to delete this task? Type yes to continue');
    console.log(tasks);
    if (deleteConfirm) {
      axios.delete(`http://localhost:3001/tasks/${id}`)
        .then(res => {
          console.log(res);
          getTasks();
        })
        .catch(err => console.error(err));
    }
  };

  const completeTask = (id) => {
    axios.patch(`http://localhost:3001/tasks/${id}`, { completed: true })
      .then(res => {
        console.log(res);
        getTasks();
      })
      .catch(err => console.error(err));
  };

  const pendingTask = (id) => {
    axios.patch(`http://localhost:3001/tasks/${id}`, { completed: false })
      .then(res => {
        console.log(res);
        getTasks();
      })
      .catch(err => console.error(err));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="App container text-center">
      <h1 className='display-1'>Tasks</h1>
      <div className='d-flex justify-content-center gap-1'>
        <input type="text" placeholder="Enter task" value={task} onChange={(event) => setTask(event.target.value)} onKeyDown={handleKeyPress}/>
        <button onClick={addTask} className='btn btn-primary'>Add Tasks</button>
      </div>
      <ul className='mt-5'>
        {tasks.map(task => (
          <div key={task.id} className='task-item-container d-flex justify-content-evenly align-items-center'>
            <li>
              {task.task} - {task.completed ? 'Completed' : 'Pending'}
            </li>
            <div className='p-1 d-flex gap-1'>
              {task.completed ? null : (
                <button onClick={() => completeTask(task.id)} className='btn btn-primary'>
                  Set As Complete
                </button>
              )}
              {task.completed ? (
                <button onClick={() => pendingTask(task.id)} className='btn btn-primary'>
                  Set As Pending
                </button>
              ) : null}
              <button onClick={() => deleteTask(task.id)} className='btn btn-primary'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
