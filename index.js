const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

//requiring express-ejs-layouts library (For Layouts)
const expressLayouts = require('express-ejs-layouts');

//importing db
const db = require('./config/mongoose');

//Passport JS
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
//SASS Middleware
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

//Accessing static files
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from sub-pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.urlencoded());

app.use(cookieParser());

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');



//Setting up passport js
//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'Codeial',
    //TODO: Change the secret before deployment 
    secret: 'HailCodeial',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (100*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl: db._connectionString
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});