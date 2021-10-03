const Todo = require("../models/todoList.model");

// Create and Save a new todo item
exports.create =  async (req, res) => {
      // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a todo item
  const todo = new Todo({
    title : req.body.title,
    description : req.body.description,
    priorityLevel  : req.body.priorityLevel,
    dateComplition : req.body.dateComplition
  });

  // Save todo item in the database
  Todo.create(todo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the todo item."
      });
    else res.send(data);
  });
  
};

// Retrieve all todo item from the database.
exports.findAll = (req, res) => {
    Todo.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };

// Find a single todo item with a memberId
exports.findOne = async(req, res) => {
    Todo.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found todo with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving todo with id " + req.params.id
            });
          }
        } else res.send(data);
      });
  
};

// Delete a todo with the specified id in the request
exports.delete = async(req, res) => {
    Todo.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found todo with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete todo with id " + req.params.id
            });
          }
        } else res.send({ message: `todo was deleted successfully!` });
      });
};
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Todo.updateById(
    req.params.id,
    new Todo(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found task with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating task with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
