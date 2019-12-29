
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

getTaskById = (req, res, next) => {
    req.models.Todos.findById(req.params.id).then(todo => {
        return res.send(todo);
    }).catch(error => next(error));
};

addTask = (req, res, next) => {
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

updateTaskById = (req, res, next) => {
	req.models.Todos.updateOne({_id: req.params.id}, {
		title: req.body.title,
		description: req.body.description,
		date: req.body.date
	}, {
		new: true,
		upsert: true,
		runvalidators: true
	}).then((status) => {
		if(status.upserted) {
			res.status(201);
		} else if(status.nModified) {
			res.status(200);
		} else {
			res.status(204);
		}
		res.send();
	}).catch((error) => {
		next(error);
	})
}

deleteTaskById = (req, res, next) => {
	req.models.Todos.findByIdAndDelete({_id: req.params.id})
	.then((task) => {
		if(task) {
			return res.status(200).send(`${task.title} has been removed`)
		}
		res.sendStatus(204);
	})
	.catch((error) => {
		next(error);
	})
}

module.exports = {
    getTodos,
    addTask,
    getTaskById,
	updateTaskById,
	deleteTaskById
};



