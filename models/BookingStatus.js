const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingStatusSchema = new Schema({
    issueDate : {
        type : Date,
        required : true,
        message : "Please provide issue date."
    },
    returnDate : {
        type : Date,
        required : true,
        message : "Please provide return date."
    },
    car : {
        type : Schema.Types.ObjectId,
        ref : "car"
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
    rentalFee : [{
        type : Number
    }],
    stamp : {
        type : String,
        required : true

    }

})


module.exports = BookingStatus = mongoose.model('bookingStatus' , BookingStatusSchema);