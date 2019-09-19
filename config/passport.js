const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Load User model
const admin = require('../models/admin');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField : 'email'} , (email , password , done)=>{
            admin.findOne({email : email}).then(user =>{
                if(!user){
                    return done(null , false , {message : 'user not reguste'});
                }

                //bcrypt
                bcrypt.compare(password , user.password , (err , isMatch) =>{
                    if(err){
                        throw err
                    }
                    if(isMatch){
                        return done(null , user)
                    }else{
                        return done(null , false , {message : 'password not matched with email id'})
                    }
                })
            })
        })
    ),
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        admin.findById(id, function(err, user) {
          done(err, user);
        });
      });
};