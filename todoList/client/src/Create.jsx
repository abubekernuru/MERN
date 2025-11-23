import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function Create({setTodos}) {
  const [task, setTask] = useState();
  const inputEl = document.getElementById('input');
  const handleAdd = ()=>{
    axios.post("http://localhost:3001/add", {task: task})
      .then(result => {
        if(!task) return;
        setTodos(prevTodos => [...prevTodos, result.data]);
        console.log(result.data)
        setTask('');
        inputEl.value = '';
      })
      .catch((err)=> console.log(err));
  }
  return (
    <div>
        <input type="text" name="task" id="input" className='input' onChange={(e)=>setTask(e.target.value)} />
        <button type="submit" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create