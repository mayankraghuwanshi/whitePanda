const express = require('express');
const router = express.Router();
const Car = require('../../models/Car');
const BookingStatue = require('../../models/BookingStatus');



router.get("/test" , (req , res)=>{
    res.send("hello, world!");
})

router.get('/' , (req , res)=>{
    Car.find({})
        .then(data=>res.json(data))
        .catch(err=>res.json(err));
})



router.get('/:carId' , (req , res)=>{
    const {carId} = req.params;
    console.log(carId)
    Car.findOne({_id:carId}).then(data=>res.status(200).json(data)).catch(err=>res.status(500).json(err));
})

router.post('/create' ,async (req , res)=>{
    const {vehicalNumber , sittingCapacity , rentPerDay , isAvailable , transmission , airCondition , bookingStatus} = req.body;
    const error = {};
    if(!vehicalNumber || vehicalNumber==undefined){
        error.vehicalNumber = "Please provide vehical number.";
    }
    if(!sittingCapacity || sittingCapacity==undefined){
        error.sittingCapacity = "Please provide sitting capacity.";
    }
    if(!rentPerDay || rentPerDay==undefined){
        error.rentPerDay = "Please proveide rent per day.";
    }
    if(!transmission || transmission==undefined){
        error.transmission = "Please provide transmission per day";
    }
    if(Object.keys(error).length>0){
        return res.status(500).json({
            success : false,
            error,
        });
    }
    if(bookingStatus!=undefined && bookingStatus.length>0){
        const bookingStatusFromDb = await BookingStatue.findOne({_id : bookingStatus});
        console.log(bookingStatusFromDb)
        if(!bookingStatusFromDb || bookingStatusFromDb==undefined){
            error.bookingStatus = "This booking status does not exist!";
            return res.status(500).json({
                success : false,
                error 
            })
        }
        const car = new Car({
            vehicalNumber,
            sittingCapacity,
            rentPerDay,
            isAvailable,
            transmission,
            airCondition,
            bookings : [{bookingStatus}]
        });
        car.save()
            .then(data=>res.status(200).json({
                success : true,
                data : data
            }))
            .catch(error=>res.status(500).json({
                success : false,
                error
            }));
    }
    const car = new Car({
        vehicalNumber,
        sittingCapacity,
        rentPerDay,
        isAvailable,
        transmission,
        airCondition,            

    });
    car.save()
    .then(data=>res.status(200).json({
        success : true,
        data
    }))
    .catch(error=>res.status(500).json({
        success : false,
        error
    }));

})

router.delete('/deleteBooking' , (req , res)=>{
    const {carId} = req.params;
    



})

module.exports = router;