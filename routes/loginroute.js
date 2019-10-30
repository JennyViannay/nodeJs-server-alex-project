var mysql = require('mysql');

var jsonfile = require('jsonfile');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'alexproject',
  insecureAuth: false
});
connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected *********** :) ************ ");
  } else {
    console.log("Error connecting database *********** :( ************", err);
  }
});

exports.register = function (req, res) {
  var today = new Date();
  // bcrypt.hash(req.body.password, 5, function( err, bcryptedPassword) {}
  var users = {
    "username": req.body.username,
    "email": req.body.email,
    "password": req.body.password,
    "online": req.body.online,
    "created": today
  }
  var email = req.body.email;
  var sqlCheckEmail = "SELECT * FROM users WHERE email = ?";
  connection.query(sqlCheckEmail, [email], (error, results, fields) => {
    if (results.length == 0) {
      console.log(fields)
      var injectSqlUser = "INSERT INTO users SET ?";
      connection.query(injectSqlUser, users, (error, results, fields) => {
        res.send({
          "code": 200,
          "success": "user registered sucessfully"
        });
      });
    }
    else if (results.length > 0) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    }
  });
}

exports.login = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      if (results.length > 0) {
        if (results[0].password == password) {
          res.send({
            "code": 200,
            "success": "login sucessfull"
          })
        }
        else {
          res.send({
            "code": 204,
            "success": "Email and password does not match"
          })
        }
      }
      else {
        res.send({
          "code": 204,
          "success": "Username does not exits"
        });
      }
    }
  });
}