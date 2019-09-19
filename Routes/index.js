const express = require('express');
const path =  require('path');

//usermodels
const Usermodels = require('../models/user');
const nodemailer = require("nodemailer");
const mailGun = require('nodemailer-mailgun-transport');

const {ensureauth} = require('../config/Auth');

const sendMail = require('../config/sendmail');

var ses = require('node-ses')
  , client = ses.createClient({ key: 'AKIA24TUDZRTS6IECCFP', secret: 'BFEZRCieZVu8Micx+dkCyibwayB31Y2TXcBNX/6cLQgks' });



//Routes
const Routes = express() ;



var QRCode = require('qrcode');




// Require library
var xl = require('excel4node');
 
// Create a new instance of a Workbook class
var wb = new xl.Workbook();
 
// Add Worksheets to the workbook
var ws = wb.addWorksheet('Sheet 1');
var ws2 = wb.addWorksheet('Sheet 2');
 
// Create a reusable style
var style = wb.createStyle({
  font: {
    color: '#0541a8',
    size: 14,
  },  
  //numberFormat: '$#,##0.00; ($#,##0.00); -',
});

//Routes
Routes.get('/' , (req ,res ,next)=>{
  res.render('loader');
  next();
});

Routes.get('/register' , (req ,res , next)=>{
    res.render('index');
    next();
});

Routes.get('/users' , async function(req ,res ,next){
    const users = await Usermodels.find({});
    res.send(users)
    next();
});
Routes.get('/data' , ensureauth ,  function(req ,res ,next){
    const users =  Usermodels.find({});
    users.find({} , (err , data)=>{
        if(err) throw err
        ws.cell(1,1).string('S.NO').style(style);
        ws.cell(1,2).string('Name').style(style);
        ws.cell(1,3).string('Email').style(style);
        ws.cell(1,4).string('Phone number').style(style);
        ws.cell(1,5).string('Email Address').style(style);
        ws.cell(1,6).string('DOB').style(style);
        ws.cell(1 ,7).string('department').style(style);

        for(let i=0 ; data.length > i ; i++){
            ws.cell(i+2 , 1).number(i+1);
            ws.cell(i+2 , 2).string(data[i].name);
            ws.cell(i+2 , 3).string(data[i].email);
            ws.cell(i+2 , 4).string(data[i].Phone);
            ws.cell(i+2 , 5).string(data[i].email);
            ws.cell(i+2 , 6).string(data[i].birth_date);
            ws.cell(i+2 , 7).string(data[i].course);
        }
        wb.write('vuefox_coders_user.xlsx' , res);
    })
})

Routes.get('/newUser' , (req ,res ,next)=>{
    res.render('vue');
    next();
});

Routes.post('/register' ,  function(req ,res ,next){
    console.log(req.body);
    const {name , email , College , Phone , birth_date , course } = req.body ; 
    const errors = [];

    if(!name || !email || !College || !Phone || !birth_date || !course){
        errors.push({msg : ' please Fill All Details'});
    }
    if(Phone.length < 10){
      errors.push({msg :'Phone number should contain 10 number'});
    }
    if(errors.length > 0 ){
        res.render('index' , {
            errors,
            name,
            email,
            College,
            Phone,
            birth_date,
            course
        });
    }else{
        Usermodels.findOne({email : email}).then(user =>{
            if(user){
                errors.push({msg:'Email Already Exists Enter another Email'})
                res.render('index' , {
                    errors,
                    name,
                    email,
                    College,
                    Phone,
                    birth_date,
                    course
                });
            }else{
                const models = new Usermodels({
                    name,
                    email,
                    College,
                    Phone,
                    birth_date,
                    course
                });

                models.save(function(err){
                    if(err){
                        res.send('err');
                    }else{
                        console.log(models);
                        req.flash('success_msg' , 'Registered Successfully Soon Contact You thank you for Registered')                         
                        res.redirect('/newUser');
                    }
                })
            }
        });
    }  
});





module.exports = Routes ;