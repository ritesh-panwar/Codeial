//Require library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/codeial_development');

//acquire the connection
const db = mongoose.connection;

//error check
db.on('error', console.error.bind(console, 'error connecting to MongoDB'));

//up and running the print the message
db.once('open', function(){
    console.log('Succesfully connected to the database');
});

//exporting file
module.exports = db;