const express = require('express');
const todo = require('./todo.js');
const router = express.Router();

/*
router.use(function timelog (req, res, next) {
  console.log('Time:', Date.now())
  next();
})
*/

router.get('/todos', todo.getTodos);
router.post('/todos', todo.addTask);
router.get('/todos/:id', todo.getTaskById);
router.patch('/todos/:id', todo.updateTaskById);
router.delete('/todos/:id', todo.deleteTaskById);

module.exports = router;