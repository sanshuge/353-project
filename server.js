// load package
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json());

const cors = require('cors');
app.use(cors());
const mysql = require("mysql");

const PORT = 3000;
const HOST = "0.0.0.0";



//Database Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Server!");
});

//Creates a database called postdb and a table called posts.
// The postdb has 3 columns: id, topic, and data.
// The id column is the primary key and is auto-incremented.
// The topic and data columns are both varchar(100) and cannot be null.
app.get("/init", (req, res) => {
  connection.query(
    `CREATE DATABASE IF NOT EXISTS postdb`,
    function (error, result) {
      if (error) console.log(error);
    }
  );
  //Create Table
  connection.query(`USE postdb`, function (error, results) {
    if (error) console.log(error);
  });
  connection.query(
    `CREATE TABLE IF NOT EXISTS posts 
    ( id int unsigned NOT NULL auto_increment, 
   
    data varchar(100) NOT NULL,
    PRIMARY KEY (id))`,
    function (error, result) {
      if (error) console.log(error);
    }
  );
  res.send("Database and Table created!");
});
//Insert into Table
// Adds new post to the database.
app.post("/addpost", (req, res) => {
 
  var data = req.body.data;

  var query = `INSERT INTO postdb.posts (post) VALUES ( "${data}")`;
  connection.query(query, function (error, result) {
    if (error) console.log(error);
    res.send(result);
  });
});
//Get all posts
//A GET request that returns all the posts in the posts table
app.get("/getposts", (req, res) => {
  const sqlQuery = "SELECT * FROM postdb.posts";
  connection.query(sqlQuery, function (error, result) {
    if (error) console.log(error);
    res.json({ posts: result });
  }); 
});

app.post("/login",(req,res)=>{
  var username = req.body.username;
  var password= req.body.password;
  var searchUsername =`SELECT * FROM postdb.userinfo WHERE username = ? `
  if (username&password){ 
    connection.query(searchUsername,[username],function(error,results){
  if (error) throw error;
  if (results.length===0){
    // user does not exist
     res.status(401);

  }
  else{
  var user = results[0];
  if (user.password !== password) {
      res.status(401);
  } else {
      res.status(200);
  }}
  
  })
  

}
});
// new users register
app.post("/register",(req,res)=>{
  var username = req.body.username;
  var password= req.body.password;
  var searchUsername =`SELECT * FROM postdb.userinfo WHERE username = ? `
  if (username&&password){
    connection.query(searchUsername,[username],function(error,results){
      if (error) throw error;
      if (results.length>0){
         res.status(400);
        
      }
      else {
        var query = `INSERT INTO postdb.userinfo (username,password) VALUES ("${username}", "${password}")`;
        connection.query(query, function (error, result) {
    if (error) throw error;
    else{
   res.status(200)}

      })
    }

     
  });
  }

})

app.get("/getChannels", (req, res) => {
  connection.query(`SELECT * FROM postdb.channels`, (error, result) => {
      if (error) {
          console.error(error);
          res.status(400).send(error);
      } else {
          res.status(200).send(JSON.stringify(result));
      }
  });
});


app.post("/addNewChannel", (req, res) => {
  var newChannel=  req.body.newChannel;

  var query = `INSERT INTO postdb.channels (channel) VALUES (?)`;
  connection.query(query, [newChannel],function (error, result) {
    if (error) console.log(error);
    res.send(result);
    
  });
});




app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
