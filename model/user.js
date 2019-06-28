//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
		fullname: String,
    email: String,
    password: String,
    uuid: String 
});

module.exports = mongoose.model('User',userSchema)
