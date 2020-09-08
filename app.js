const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport'); 
const passportConfig = require('./app/configs/passport-config');

const app = express();
const port = 3000;
const users = require('./app/routes/users');
const auths = require('./app/routes/auths');
//process.env.root = __dirname;

//app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'FyprBoilerplate', resave: false, saveUninitialized: false, cookie:{secure:false} }));
app.use(passport.initialize());

switch(passportConfig.strategy){
    case "local":
        app.use(passport.session());
        require('./app/configs/passport-local')(passport);
    default:
        require('./app/configs/passport-jwt')(passport);
}

app.use(function (error, request, response, next) {
    console.error(error.stack);
    response.status(400).send(error.message);
});

app.get('/', (req, res) => res.send('Welcome to Fypr Backend Starter'))
app.use('/users', users);
app.use('/auths', auths);

app.listen(port, () => console.log('Fypr Backend app is running'));