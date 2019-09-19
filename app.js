const express = require('express');
const path = require('path');
const body = require('body-parser'); 
const mongoose = require('mongoose');
const session =  require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const methodOverride = require('method-override');
const cors = require('cors');
//var 
var app = express();

//cors
app.use(cors());

//config
const config = require('./config/config');

//passport
require('./config/passport')(passport);

app.use( '/Assets',express.static(path.join(__dirname + '/Assets')));
app.use('/login' , express.static(__dirname + '/login'));
app.use('/dash' , express.static(path.join(__dirname + '/dash')));
app.use('/video' , express.static(path.join(__dirname + '/video/tamil.mp4')))

app.set('view engine' , 'ejs');

app.use(express.urlencoded ({extended :false}));
app.use(body.json());
app.use(methodOverride('_method'));






const db = require('./config/config').MONGO_URI;

mongoose.connect(db , ({useNewUrlParser : true}))
.then(() => console.log('connected')).catch(err => console.log(err));


app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
//flash
app.use(flash());

//middleware
app.use(function(req ,res ,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//session
//session


//Routes
app.use('/' , require('./Routes/index'));
app.use('/login' ,  require('./Routes/Users'));


app.listen(config.PORT , ()=> console.log(`${config.PORT}`));



