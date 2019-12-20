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
router.post('/todos', todo.post);
router.get("/todos/:id", todo.getById);

module.exports = router;