import React from 'react'
import Create from './Create'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './Home.css'; // Import the CSS file

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
            <div className="app-container">
                <div className="todo-card">
                    <h1 className="app-title">📝 Todo App</h1>
                    <Create setTodos={setTodos} />
                    <div className="loading-spinner">Loading your todos...</div>
                </div>
            </div>
        )
    }

    if (loading) {
        return <Loading />;
    }

    const handleEdit = (id) => {
        axios.put(`http://localhost:3001/edit/${id}`)
        .then((result) => {
            setTodos(prevTodos => prevTodos.map(todo => 
                todo._id === id ? { ...todo, done: !todo.done } : todo
            ));
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
        .then((result) => {
            // Fixed: Actually remove the todo instead of toggling done status
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="app-container">
            <div className="todo-card">
                <h1 className="app-title">📝 Todo App</h1>
                <Create setTodos={setTodos} />
                
                <div className="todos-container">
                    {todos.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📝</div>
                            <h3>No tasks yet</h3>
                            <p>Add a task above to get started!</p>
                        </div>
                    ) : (
                        todos.map(todo => ( 
                            <div className={`todo-item ${todo.done ? 'completed' : ''}`} key={todo._id}>
                                <div 
                                    className="check-circle"
                                    onClick={() => handleEdit(todo._id)}
                                >
                                    {todo.done && <span className="checkmark">✓</span>}
                                </div>
                                
                                <span className="task-text">{todo.task}</span>
                                
                                <button 
                                    className="delete-btn"
                                    onClick={() => handleDelete(todo._id)}
                                    title="Delete task"
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>
                
                {todos.length > 0 && (
                    <div className="todo-stats">
                        {todos.filter(todo => todo.done).length} of {todos.length} tasks completed
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;