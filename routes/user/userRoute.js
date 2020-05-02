const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const getHash = require('../../factory').getHash

router.get('/' , (req , res)=>{
    User.find({}).then(data=>res.status(200).json(data)).catch(err=>res.status(500).json(err));
})

router.post('/create' , (req , res)=>{
    const {name , email , password , phoneNumber , isAdmin} = req.body;
    const error = {};
    if(!name || name==undefined){
        error.name = "Please provide user name.";
    }
    if(!email || email==undefined){
        error.email = "please provide email.";
    }
    if(!password || password==undefined){
        error.password = "Please provide password."
    }
    if(Object.keys(error).length>0){
        return res.status(500).json({
            success : false,
            error
        })
    }
    const user = new User({
        name,
        password : getHash(password),
        email,
        isAdmin
    });
    user.save()
        .then(data=>res.status(200).json({
            success : true,
            data
        }))
        .catch(error=>res.status(500).json({
            success : false,
            error
        }));
})



module.exports = router;