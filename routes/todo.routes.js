
var app = require('express').Router();
const todo = require("../controllers/todo.controller");
const user = require("../controllers/user.controller");

// Create a new task
app.post("/tasks", todo.create);
app.get("/task", todo.findAll);
app.get("/task/:id", todo.findOne);
app.delete("/task/:id", todo.delete);
app.put("/task/:id", todo.update);
app.post("/users", user.create);
app.post("/login", user.login);

module.exports = app;