const sql = require("./db.js");

// constructor
const User = function(user) {
  this.email = user.email;
  this.password = user.password;

 
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
User.findById = (email, result) => {
  sql.query(`SELECT * FROM user WHERE email = ?`,[email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found email item: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found user item with the email
    result({ kind: "not_found" }, null);
  });
};

  
module.exports = User;