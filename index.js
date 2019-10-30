const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const login = require('./routes/loginroute');
const messages = require('./routes/messagesroute');
const game = require('./routes/gameroute');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
// console.log that your server is up and running

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'welcome to our upload module apis' });
});


//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login);
router.post('/messages',messages.messages);
router.get('/messages/:user',messages.getMessagesSend);
router.get('/messages/send/:user',messages.getMessagesReceved);
router.post('/game',game.postMessageOnGame);
router.get('/game/list/clear',game.listMessagesClear);
router.get('/game/list/crypted',game.listMessagesCrypted);
//route to handle file printing and listing
app.use('/api', router);

app.listen(port, () => console.log(`SUCCESS : Listening on port ${port}`));


