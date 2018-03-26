 const express = require('express');
 var path = require('path');
 var mongoose = require('mongoose');
 var bodyParser = require('body-parser');
 var cors = require('cors');
 var multer = require('multer');

 var app = express();

 // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//public folder
app.use(express.static(path.join(__dirname, 'public')));
// enable pre-flight across-the-board
app.use('*', cors());

var employee = require('./routes/employee');

app.use('/Employee', employee);



//import Config File
var config = require('./config');
// setup mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect(config.MongoDBURL,{
});

var dbCon = mongoose.connection;
dbCon.on('error', (err) => {
  console.log('Error connecting to mongoDB: ', err);
});
dbCon.on('open', () => {
  console.log('Connection established to mongoDB.');
});







 var port = 3000;

 app.listen(port, () => {
     console.log(`Server started on port ` + port);
 });

