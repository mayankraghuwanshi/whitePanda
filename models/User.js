const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String,
        required : true,
        message : "Name is required!"
    },
    email : {
        type : String,
        unique : true,
        message : "Email is required"
    },
    phoneNumber : {
        type : Number
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : { 
        type : Boolean,
        default : false
    }
})

module.exports = User = mongoose.model('user' , UserSchema);
