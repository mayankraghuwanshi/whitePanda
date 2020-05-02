const express = require('express');
const router = express.Router();
const BookingStatus = require('../../models/BookingStatus');
const User = require('../../models/User');
const Car = require('../../models/Car');
const isValidDate = require('../../factory').isValidDate;
const canCarBeBooked = require('../../factory').canCarBeBooked;
const mongoose = require('mongoose');



router.get('/test' , (req , res)=>{
    res.send('hello, world!');
})

router.get('/' , (req , res)=>{
    BookingStatus.find({}).then(data=>res.status(200).json(data)).catch(err=>res.status(500).json(err));
})


router.post('/create' , async (req , res)=>{
    const {issueDate , returnDate , user , car} = req.body;
    const error = {};
    if(!issueDate || issueDate==undefined){
        error.issueDate = "Please provide a valid issue date in DD/MM/YYYY formate";
    }
    if(!isValidDate(issueDate)){
        error.issueDate = "Please provide a valid issue date in DD/MM/YYYY formate";
    }
    if(!returnDate || returnDate==undefined){
        error.returnDate = "Please provide a valid return date in DD/MM/YYYY formate";
    }
    if(!isValidDate(returnDate)){
        error.returnDate = "Please provide a valid return date in DD/MM/YYYY formate";
    }
    if(!user || user == undefined){
        error.user = "Please provide a user details.";
    }
    if(!car || car == undefined){
        error.car = "Please provice a car details.";
    }
    if(Object.keys(error).length>0){
        return res.status(500).json({
            success : false,
            error
        })
    }

    const userFomDb = await User.findOne({_id : user})
        .catch(error=>res.status(500).json({
            success : false,
            error
        }));

    if(!userFomDb){
        res.status(500).json({
            success : false,
            error :{
                user : "Invalid user."
            }
        })
    }
    console.log(userFomDb);

    if(!userFomDb.isAdmin){
        res.status(500).json({
            success : false,
            error :{
                user : "Only admin can book a car."
            }
        })
    }
    

    const carFromDb = await Car.findOne({_id : car})
        .catch(error=>res.status(5000).json({
            success : false,
            error
        }))
    if(!carFromDb){
        res.status(500).json({
            success : false,
            error : {
                car : "Invalid car"
            }
        })
    }
    console.log(carFromDb);

    let allBookingStatus = carFromDb.bookingStatus;
    if(!canCarBeBooked(allBookingStatus , issueDate , returnDate)){
        res.status(500).json({
            success : false,
            car  :"This car is not availabe for the fiven time"
        });
    }
    
    const stamp = Date.now();
    carFromDb.bookingStatus.push({
        issueDate,
        returnDate,
        stamp

    })
    console.log(carFromDb)

    await carFromDb.save().catch(error=>res.status(500).json({
        success : false,
        error
    }))

    const bookingStatus = new BookingStatus({
        issueDate,
        returnDate,
        user,
        car,
        stamp
    })


    bookingStatus.save()
    .then(data=>res.status(200).json({
        success : true,
        data
    }))
    .catch(err=>res.status(500).json(res))
})



router.delete('/delete:bookingId' ,async (req , res)=>{
    const {bookingId} = req.params;
    console.log(bookingId);
    const bookingStatus = await BookingStatus.findOne({_id : bookingId})
        .catch(error=>res.json({
            success : false,
            error
        }))
    if(!bookingStatus){
        res.json({
            success  :false ,
            error : {
                bookingId : "invalid booking id"
            }
        })
    }
    console.log(bookingStatus)
    const car = await Car.findOne({_id : bookingStatus.car}).catch(error=>res.json({
        success  :false,
        error
    }))
    if(!car){
        res.json({
            success : false,
            error : {
                car : "invalid car id"
            }
        })
    }
    
    await BookingStatus.deleteOne({_id : bookingId}).catch(error=>res.json({
        success : true,
        error
    }))
   
    let filterdBookingList = car.bookingStatus.filter(item=>item.stamp!=bookingStatus.stamp);
   
    car.bookingStatus = filterdBookingList;
    

    car.save().then(data=>res.json({
        success  :true,
        data
    }))
    .catch(error=>res.json({
        success : false,
        error
    }))
    
    
})




router.put('/update:bookingId' , (req , res)=>{
    const {issueDate , returnDate , user , car} = req.body;
    
    
})

module.exports = router;