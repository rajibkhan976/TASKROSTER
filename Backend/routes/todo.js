
getTodos = (req, res, next) => {
    var query;
    if (req.query.title) {
        query = req.models.Todos.findOne({ title: req.query.title });
    } else {
        query = req.models.Todos.find();
    }

    query.exec().then(todo => {
        return res.send(todo);
    }).catch(error => next(error));
};

getById = (req, res, next) => {
    req.models.Todos.findById(req.params.id).then(todo => {
        return res.send(todo);
    }).catch(error => next(error));
};

post = (req, res, next) => {
    req.models.Todos.create({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    }).then(todo => {
        return res.status(201).send(todo);
    }).catch(error => {
        next(error);
    });
};

module.exports = {
    getTodos,
    post,
    getById
};



