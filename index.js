//express module for nodejs server
const express = require('express');
const app = express();

//routes module for nodejs routing
const router = express.Router();
const path = require('path');

//mongoose module for database connect
const mongoose = require('mongoose');
const config = require('./config/database');
const port = process.env.Port || 8080;

//middleware module for database post
const bodyParser = require('body-parser');
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blogs')(router);
const cors = require('cors');

mongoose.Promise = global.Promise;

//mongoose connect
mongoose.connect(config.uri, {useMongoClient: true});
mongoose.connection.once('open', () => {
  console.log('successfully connect to database!')
}).on('error', (err) => {
  console.log('connect Error', err)
})

//middleware
app.use(cors({
  origin: 'http://localhost:4200'
}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));
app.use('/authentication', authentication);
app.use('/blogs', blogs);
//html/css import use express.static(fold_name), module (function/method) use module name
//'/authentication' bridge is optional. if use it, test path in Postman is http://localhost:8080/authentication/register
//if not use, test path in Postman is http://localhost:8080/register

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(port, () => {
  console.log('listening on port ' + port)
 })
