const User = require("../models/user.model");
const db = require("../models/db");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
// Create and Save a new todo item
exports.create =  async (req, res) => {
      // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a user item
  const user = new User({
    email : req.body.email,
    password : req.body.password,
    
  });

  // Save todo item in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user item."
      });
    else res.send(data);
  });
  
};

// Find a single user item with a memberId
exports.findOne = async(req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found user with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving user with id " + req.params.id
            });
          }
        } else res.send(data);
      });
  
};
exports.login = async(req, res) => {
  db.query(
    `SELECT * FROM user WHERE email = ?`, req.body.email,
    (err, userInfos) => {
      
      // check password
      if (userInfos != null) {
        console .log(userInfos[0].password)
        if (req.body.password == userInfos[0].password) {
            const token = jwt.sign({id: userInfos[0].id}, req.app.get("secretkey"), {expiresIn: "2h"})
            res.json({status: "success", msg: 'user found', data: {user: userInfos, token: token}})

        } else {
            res.json({status: 'error', msg: 'email or passeword incorect' + err})
            console.log(err)
            console.log(req.body)
        }

    } else {
        res.json({status: 'error', msg: 'errrrur' + err})
        console.log(err)
    }
    }
  );

},
exports.logout = async(req, res) => {

  res.status(200).send({ auth: false, token: null })}
