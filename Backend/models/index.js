const mongoose = require('mongoose');
const student = require('./todo.js');


const uri = process.env.DATABASE_URL || "mongodb://localhost:27017/taskroster"

const connectDb = () => {
    return mongoose.connect(uri, {useFindAndModify: false});
}
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', true)
mongoose.set('useCreateIndex', true)

module.exports = {
    connectDb,
    models: {
        todo
    }
}