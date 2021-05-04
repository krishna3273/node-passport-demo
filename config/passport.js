const local_strategy=require('passport-local').Strategy
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const User=require('../models/User')

module.exports=(passport)=>{
    passport.use(
        new local_strategy({usernameField:'email'},(email,password,done)=>{
            User.findOne({email})
            .then(user=>{
                if(!user){
                    return done(null,false,{message:"This email is not registered"})
                }
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err
                    if(isMatch){
                        return done(null,user,)
                    }
                    else{
                        return done(null,false,{message:"password incorrect"})
                    }
                })
            })
            .catch(err=>console.log(err))
        })
    )
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done)=>{
        User.findById(id,(err, user)=>{
            done(err, user);
        });
    });
}