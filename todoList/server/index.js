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

app.put('/edit/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const currentTodo = await TodoModel.findById(id);
        if (!currentTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            id, 
            { done: !currentTodo.done },
            { new: true }
        );
        res.json(updatedTodo);
      } catch (err) {
        console.log("Update error:", err);
        res.status(500).json({ error: "Failed to update todo", err });
    }
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

app.delete('/delete/:id', (req, res)=>{
  const id = req.params.id;
  TodoModel.findByIdAndDelete({_id: id})
  .then((result)=>{
        res.json(result);
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




