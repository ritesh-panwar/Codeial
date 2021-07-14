const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

//requiring express-ejs-layouts library (For Layouts)
const expressLayouts = require('express-ejs-layouts');

//importing db
const db = require('./config/mongoose');

//Accessing static files
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from sub-pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.urlencoded());

app.use(cookieParser());

//use express router
app.use('/', require('./routes'));

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});