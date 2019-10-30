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

exports.messages = function (req, res) {
    var today = new Date();
    var message = {
        "pseudo": req.body.pseudo,
        "message": req.body.message,
        "sendto": req.body.sendto,
        "date": today
    }

    var injectSqlUser = "INSERT INTO messages SET ?";
    connection.query(injectSqlUser, message, (error, results) => {
        if(error){
            console.log(error)
        }
        res.status(200)
    });   
}


exports.getMessagesSend = function (req, res) {
    var user = req.params.user;
    connection.query("SELECT * FROM messages WHERE pseudo = ?", user, (error, data) => {
        if(error){
            console.log(error);   
        }
        console.log(data);
        
        res.json(data);
    })
}

exports.getMessagesReceved = function (req, res) {
    var user = req.params.user;
    connection.query("SELECT * FROM messages WHERE sendto = ?", user, (error, data) => {
        if(error){
            console.log(error);   
        }
        console.log(data);
        
        res.json(data);
    })
}

