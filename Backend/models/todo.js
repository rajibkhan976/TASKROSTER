mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todos: {

        title: String,
        description: String,
        date: Number,

    }
});



const todo = mongoose.model('todo', todoSchema);

module.exports = todo;
