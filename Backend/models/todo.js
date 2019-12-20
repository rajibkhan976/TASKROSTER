const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Number
});



const Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;
