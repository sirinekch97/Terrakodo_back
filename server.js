const express = require("express");
const app = express();
const routees = require("./routes/todo.routes");
const cors=require("cors");
//const bodyParser = require("body-parser");

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));
app.use((req,res,next)=>{
  res.header('Access-control-Allow-Origin','*')
  res.header('Access-Control-Allow-Header','Origin,X-Request-With,Content-Type,Accept,Authorization');
  if(req.method==='OPTIONS'){
      res.header('Access-Control-Allow-Method','PUT,POST,GET,PATCH,DELETE');
      return res.status(200).json({});
  }
  next();

})
app.use(cors('*'));
app.use('/', routees);
app.set('secretkey','test')

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});