import React from 'react'
import Create from './Create'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Home() {
        const [todos, setTodos] = useState([]);
        const [loading, setLoading] = useState(true);
        useEffect(()=> {
                axios.get("http://localhost:3001/get")
                .then((result)=> {
                        setTodos(result.data);
                        setLoading(false);
                })
                .catch((err)=> console.log(err))
        }, [])

        const Loading = () => {
                return (
                        <div className='todo'>
                        <h2>Todo List</h2>
                        <Create setTodos={setTodos} />
                        <div><h2>Loading...</h2></div>
                        </div>
                        )}
        if (loading) {
                return <Loading />;
        }
        return (
        <div className='todo'>
                <h2>Todo List</h2>
                <Create setTodos={setTodos} />
                {
                        todos.length === 0
                                ? 
                        <h2>No todo records</h2>
                                :
                        todos.map(todo =>( 
                                <div className='todoLists' key={todo._id}>
                                        {todo.task}
                                </div>
                        ))
                }
        </div>
)
}

export default Home;