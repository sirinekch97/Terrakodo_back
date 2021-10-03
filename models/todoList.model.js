const sql = require("./db.js");

// constructor
const Todo = function(todo) {
  this.title = todo.title;
  this.description = todo.description;
  this.priorityLevel = todo.priorityLevel;
  this.dateComplition=todo.dateComplition;
};

Todo.create = (newTodo, result) => {
  sql.query("INSERT INTO todolist SET ?", newTodo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created task: ", { id: res.insertId, ...newTodo });
    result(null, { id: res.insertId, ...newTodo });
  });
};
Todo.getAll = result => {
    sql.query("SELECT * FROM todolist", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("todolist: ", res);
      result(null, res);
    });
  };

Todo.findById = (id, result) => {
  sql.query(`SELECT * FROM todolist WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found todo item: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found todo item with the id
    result({ kind: "not_found" }, null);
  });
};
Todo.remove = (id, result) => {
    sql.query("DELETE FROM todolist WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found task with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted task with id: ", id);
      result(null, res);
    });
  };
  Todo.updateById = (id, todo, result) => {
    sql.query(
      "UPDATE todolist SET title = ?, description = ?, priorityLevel = ?, dateComplition = ? WHERE id = ?",
      [todo.title, todo.description, todo.priorityLevel,todo.dateComplition, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found task with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated task: ", { id: id, ...todo });
        result(null, { id: id, ...todo });
      }
    );
  };
  
module.exports = Todo;