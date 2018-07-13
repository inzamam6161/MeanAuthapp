const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const mongoose =require('mongoose');
const config = require('./config/database');
const passport = require('passport');
//Connect to database
mongoose.connect(config.database);

//Connection to database
mongoose.connection.on('connected', () =>{
    console.log('Connected to '+config.database);
});

//error
mongoose.connection.on('error', (err) => {
    console.log('error ' +err);
});

const app = express();
//Cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


require('./config/passport')(passport);
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes setup
const users = require('./routes/users');
app.use('/users', users);

//index route
app.get('/',(req, res)=>{
res.send('Invalid end point');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});