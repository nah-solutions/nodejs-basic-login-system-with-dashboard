const mongoose = require('mongoose');

const Usershema1 = new mongoose.Schema({
    email :{
        type : String ,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now,
    }
});

const User1 = mongoose.model('admin' , Usershema1);

module.exports = User1 ;