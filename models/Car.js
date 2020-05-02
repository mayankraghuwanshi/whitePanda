const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CarSchema = new Schema({
    vehicalNumber : {
        type : String,
        require : true
    },

    sittingCapacity : {
        type : Number,
        require : true,
        message : "Sitting capacity can not be null!"
    },
    rentPerDay : {
        type : Number,
        require : true,
        message : "Rent perday is required!"
    },
    isAvailable : {
        type : Boolean,
        default : true
    },
    transmission : {
        type : String,
        require : true,

    },
    airCondition: { 
        type : Boolean,
        default : false
    },

    bookingStatus :[ {
        issueDate : {
            type : Date
        },
        returnDate : {
            type : Date
        },
        stamp : {
            type : String
        }

    }],

});




module.exports = Car = mongoose.model('Car' , CarSchema);