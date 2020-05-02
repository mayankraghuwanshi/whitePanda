const express = require('express');
const router = express.Router();

router.use("/car" ,require('./car/carRoute'));
router.use('/booking' , require('./booking/bookingRoute'));
router.use("/user" ,require('./user/userRoute'));

module.exports = router;