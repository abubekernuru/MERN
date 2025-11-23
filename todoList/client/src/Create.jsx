import React from 'react';
import { useState, useRef } from 'react'; // Added useRef
import axios from 'axios';

function Create({setTodos}) {
  const [task, setTask] = useState('');
  const inputRef = useRef(null); // Better approach than document.getElementById

  const handleAdd = () => {
    if (!task.trim()) return; // Prevent empty tasks
    
    axios.post("http://localhost:3001/add", {task: task})
      .then(result => {
        setTodos(prevTodos => [...prevTodos, result.data]);
        setTask('');
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      })
      .catch((err) => console.log(err));
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  }

  return (
    <div className="add-task-container">
      <div className="input-group">
        <input 
          type="text" 
          ref={inputRef}
          placeholder="What needs to be done?" 
          className="task-input" 
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          type="submit" 
          className="add-btn"
          onClick={handleAdd}
          disabled={!task.trim()} // Disable if empty
        >
          Add Task
        </button>
      </div>
    </div>
  )
}

export default Create;