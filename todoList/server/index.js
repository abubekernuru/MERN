const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const TodoModel = require('./Model/Todo');

app.use(express.json());
app.use(cors());

app.get('/get', (req, res)=>{
    TodoModel.find({})
    .then((todos)=>{
        res.json(todos);
    })
    .catch((err)=>{
        res.status(500).json({error: "Failed to fetch todos"});
    })
})

app.post('/add', (req, res)=>{
    const task = req.body.task;
    TodoModel.create({task: task})
    .then((newTodo)=>{
        res.json(newTodo);
    })
    .catch((err)=>{
        res.status(500).json({error: "Failed to add todo"});
    })
})

mongoose.connect("mongodb://127.0.0.1:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3001, () => {
      console.log("Server running on port 3001!");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });




