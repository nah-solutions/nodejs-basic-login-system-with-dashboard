const mongoose = require('mongoose');
const timestamp = require('mongoose-stamp');


//user-models

const userschema = new mongoose.Schema({
   name : {
       type : String,
       required : true
   },
   email : {
         type : String,
         required : true
   },
   College :{
       type : String ,
       required : true
   },
   Phone : {
       type : String,
       required : true
   },
   birth_date : {
       type : String ,
       required : true
   },
   course : {
       type : String,
       required : true
   },
   date : {
       type : Date,
       default : Date.now
   }
});

const Usermodels = mongoose.model('vuefox_workshop' , userschema);

module.exports = Usermodels ;