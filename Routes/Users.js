const express = require('express');
const Routes = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

//auth
const {ensureauth , forwardAuthenticated} = require('../config/Auth');
//usermodel 
const userModels = require('../models/user');
//admin modls
const admodels = require('../models/admin');

var visit = 0;


Routes.get('/admin' , forwardAuthenticated , (req ,res ,next)=>{
    res.render('admin');
});

Routes.post('/admin' , forwardAuthenticated , function(req ,res , next){
    console.log(req.body);
    passport.authenticate('local' , {
        successRedirect : '/login/dashboard',
        failureRedirect : '/login/admin',
        failureFlash : true 
    })(req ,res ,next);
  });

Routes.post('/register' , verifytoken , async (req ,res ,next)=>{
    jwt.verify(req.token , 'secrectkey' , (err ,Authdata)=>{
        if(err) {
            res.send('token expire')
        }else{

            console.log(req.body);
            const {email , password , name} = req.body
        
            const aduser = new admodels({
                email,
                password,
                name
            });
           bcrypt.genSalt((err , salt)=>{
               bcrypt.hash(aduser.password , salt , (err ,hash)=>{
                   aduser.password = hash ;
        
                   aduser.save(function(err){
                       if(err){
                           res.send('err')
                       }else{
                           res.sendStatus(201);
                           next();
                       }
                   });
               });
           });

        }
       

    });
    

});



Routes.get('/dashboard' , async  (req ,res , next)=>{
   try{
    visit++
    const users = await userModels.find({})
    res.render('dash' , {
        count : users.length ,
        visitor : visit , 
        name : req.user.name,
    })
   }catch{

   }
});

Routes.get('/token' ,    (req ,res ,next)=>{
    
});

function verifytoken(req ,res ,next){
    const bearerHeaders = req.headers['authorization'];

    if(typeof bearerHeaders !== 'undefined'){
        //split
        const bearer = bearerHeaders.split(' ');
        //token
        const bearertoken = bearer[1];
        //req.token
        req.token = bearertoken
        //next
        next();
    }
}

Routes.get('/dashboard/manage' , async (req ,res)=>{
       const users = await userModels.find({});
       res.render('manage' , {
           list : users.name
       })
})

Routes.post('/dashboard/manage' , (req ,res)=>{
    console.log(req.body)
});


Routes.delete('/dashboard/:id' , async  (req ,res)=>{
    try{
     const removepost = await userModels.deleteOne({_id: req.params.id})
     res.send(removepost);
    }catch{

    }
})


Routes.get('/gentoken' , ensureauth , (req ,res , next)=>{
    const users = {
        email : 'nitishv509@gmail.com',
        password : 'nitish123'
    }
    jwt.sign({users} , 'secrectkey' ,{expiresIn : '100s'} , (err ,token)=>{
      if(err) throw err
      res.render('token' , {
          key : token ,
          name : req.user.name ,
      })
    });
   
})


Routes.get('/logout'  , (req ,res ,next)=>{
    req.logout();
    req.flash('success_msg', 'you are logout');
    res.redirect('/login/admin');
});
Routes.get("/video/tamil" , (req ,res , next)=>{
   res.render('video');
   next();
});

Routes.get('/video/the' , function(req ,res , next){
    res.render('the');
    next();
})

module.exports = Routes ;