// require mongoose
const mongoose = require('mongoose');
// connect the mongoose to the database using coneect method
mongoose.connect('mongodb://localhost/contact_list');

//aquire connection(check if itsuccesfull)
const db=mongoose.connection;

// if error 
db.on('error',function(err){
    console.log(err);
});

//If there is no error then print the message successfully connected to the database.
db.once('open',function(){
console.log("successfully connected to the database");
});
