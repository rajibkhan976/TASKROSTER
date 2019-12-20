const express = require('express');
const student = require('./todo.js');
const router = express.Router();


router.use(function timelog (req, res, next) {
  console.log('Time:', Date.now())
  next();
})



router.get('/todos', todo.get);
router.post('/todos', todo.post);
router.get("/todos/:id", todo.getById)
router.delete("/todos/:id", todo.deleteById)
router.put("/todos/:id", todo.put)
router.patch("/todos/:id", todo.patch)



module.exports = router;