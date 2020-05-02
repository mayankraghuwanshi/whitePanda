const express = require('express');
const app = express();
const PORT = process.env.PORT | 3000;
const mongoose = require('mongoose');
const config = require('./config.js');
//initialize parsers
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))
//initialize mongodb
mongoose.connect(config.MONGO_URL)
.then(success=>console.log('MongoDB is connected.'))
.catch(err=>console.error(err));


app.get("/test" , (req , res)=>{
    res.send("hello, world!");
})

app.use("/" , require('./routes/main'));





app.listen(PORT , ()=>{
    console.log(`http://localhost:${PORT}`);
})