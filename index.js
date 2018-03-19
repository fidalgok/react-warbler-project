require("dotenv").config()
var express = require("express");
var app = express();
var cors = require('cors');
var bodyParser = require("body-parser");
var authRoutes = require("./routes/auth");
var messagesRoutes = require("./routes/messages");
var auth = require('./middleware/auth');
var db = require("./models");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.json({message: "Make a POST request to /api/auth/signup to signup"});
});

app.use('/api/users/:id/messages',
        auth.loginRequired, auth.ensureCorrectUser,
        messagesRoutes);
app.use('/api/auth', authRoutes);
app.get('/api/messages', function(req, res, next) {
  db.Message.find().sort({createdAt: 'desc'})
    .populate("userId", {username: true, profileImageUrl: true})
    .then(function(messages) {
      res.json(messages);
    }).catch(function(err) {
      res.status(500).json(err);
    })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.send(`Error status ${err.status}: ${err.message}`);
});

const PORT = 8081

app.listen(PORT, function(){
  console.log(`Server is listening on port ${PORT}`);
});
