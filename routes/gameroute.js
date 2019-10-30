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

exports.postMessageOnGame = function (req, res) {
  var today = new Date();
  // bcrypt.hash(req.body.password, 5, function( err, bcryptedPassword) {}
  var messageTocrypte = req.body.message;
  var lenghtMsh = messageTocrypte.length
  var cryptedMsg = '';
  for(let i =0; i <= messageTocrypte.length; i ++){
    cryptedMsg += '-' ;
  }
  cryptedMsg += renderHideMessage(messageTocrypte);
  var messages = {
    "message" : req.body.message,
    "crypted" : cryptedMsg,
    "username": req.body.pseudo,
    "created": today
  }

  var sqlReq = "INSERT INTO game SET ?";
  connection.query(sqlReq, messages, (error, results, fields) => {
    if (error) {
      console.log(error)
    }
    else {
      res.send({
        "code": 200,
        'success': 'Cadavre envoyé'
      })
    }
  });
}

renderHideMessage = (message) => {
  const split = message.split(" ");
  return split[split.length - 1];
};

exports.listMessagesClear = function (req, res) {
    connection.query("SELECT * FROM game", (error, data) => {
        if(error){
            console.log(error);   
        }
        console.log(data);
        
        res.json(data);
    })
}

exports.listMessagesCrypted = function (req, res) {
  connection.query("SELECT crypted FROM game ", (error, data) => {
      if(error){
          console.log(error);   
      }
      console.log(data);
      
      res.json(data);
  })
}



