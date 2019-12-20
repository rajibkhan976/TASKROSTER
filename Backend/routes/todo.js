
get = (req, res, next) => {
    console.log(req.query.name);

    var query;
    if (req.query.name) {
        query = req.models.student.findOne({ 'students.name': req.query.name });
    } else {
        query = req.models.student.find();
    }

    query
        .exec()
        .then(student => {
            return res.send(student);
        })
        .catch(error => next(error));
};

post = (req, res, next) => {
    req.models.todo.create({
        todos: {
            title: req.body.todos.title,
            description: req.body.todos.description,
            date: req.body.todos.date
        }
    })
        .then(student => {
            return res.status(201).send(student);
        })
        .catch(error => {
            next(error);
        });
};

getById = (req, res, next) => {
    req.models.student.findById(req.params.id)
        .then(student => {
            return res.send(student);
        })
        .catch(error => next(error));
};

module.exports = {
    get,
    post,
    getById,
    deleteById,
    put,
    patch
};



