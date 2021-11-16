var express = require('express');
var passport=require('passport');
var sendEmail=require('../mailer');
var authenticate=require('../authenticate');
var cors = require('./cors');
var router = express.Router();
router.use(express.json()); 

var User = require('../models/user');
var Token = require('../models/token')
var Application = require('../models/application');
var Candidate = require('../models/candidate');
var Company = require('../models/company');

const crypto=require("crypto");
const bcrypt=require("bcrypt");
const bcryptSalt=process.env.BCRYPT_SALT;



/********************** Exclusive For Admin *************************/
router.options('*',cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})

router.post('/create/admin',cors.cors,authenticate.verifyUser,authenticate.verifyAdmin,async (req,res,next)=>{
  try{  
    const info=req.body.CreateInfo;
    var ch= await User.findOne({username:info.username});
    if(ch!==null){
      var msg ="Email already exists";
      res.statusMessage = msg;
      return res.status(409).end(); 
    }
    await User.register(new User({username:info.username,usertype:"admin",active:true}),info.password);
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    res.json({msg:"New Admin Account Created !!"});     
  }
  catch(err){
    next(err);
  }     
})


/**************************Exclusive For Company********************/

router.post('/apply/company',cors.cors,async (req,res,next)=>{
  try{  
    const info=req.body.ApplyInfo;
    var ch= await User.findOne({username:info.username});
    if(ch!==null){
      var msg = (ch.active)?"Application Still pending for this email!":"Email already exists";
      res.statusMessage = msg;
      return res.status(409).end(); 
    }
    await new Application(info).save();
    await User.register(new User({username:info.username,usertype:"company",active:false,firstname:info.firstname,lastname:info.lastname}),info.password);
    await sendEmail(info.username,"Application Acknowledgement","Your Application for Account Creation was succesfully submitted. We will contact you through email after we have verified your details.\n\nThank You,\nTeam Coding Live");
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    res.json({msg:"Application Submitted. Check your Email for More details"});     
  }
  catch(err){
    next(err);
  }     
}); //Redirects to the Welcome page with approval waiting message 



/******************Exclusive For Candidate********************/

router.post('/signup/candidate',cors.cors,async (req,res,next)=>{
  try{ 
    var info = req.body.SignUpInfo;
    var ch= await User.findOne({username:info.username});
    if(ch!==null){
      res.statusMessage = "Email Already Exists!!";
      return res.status(409).end(); 
    }
    else{
      var user= new User({username:info.username,usertype:"candidate",firstname:info.firstname,lastname:info.lastname});
      await User.register(user,info.password);
      var cand = new Candidate(info);
      cand._id= user._id;
      await cand.save();
      res.statusCode= 200;
      res.setHeader('Content-Type','application/json');
      res.json({msg:"Account Creation Successfull!! Redirecting to Dashboard..."});
    }
  }catch(err){
     console.log(err);
     next(err);
  }
}); //frontend calls the login api once the signup api is successfull for candidate


router.get('/auth/facebook',cors.cors,passport.authenticate("facebook"));

router.get('/facebook/token', (req, res, next) => {
  passport.authenticate('facebook',
    (err,user,info)=>{  //to pass customized error message from done
      if(err){return next(err);}
      if(!user){
        res.redirect(process.env.BASE_URL+"/?success=false&errmsg="+info+"&garbage=")
      }
      else{
        req.logIn(user,(err)=>{
          var token = authenticate.getToken({_id: req.user._id});
          res.redirect(process.env.BASE_URL+"/?success=true&token="+token+"&username="+req.user.username+"&usertype="+req.user.usertype+"&garbage=");
        });
      }
    })(req,res,next);
});


router.get('/auth/google',cors.cors,passport.authenticate("google",{
  scope: ["profile","email"]
}));

router.get('/google/token', cors.cors, (req, res, next) => {
  passport.authenticate('google',
    (err,user,info)=>{
      if(err){return next(err);}
      if(!user){
        res.redirect(process.env.BASE_URL+"/?success=false&errmsg="+info+"&garbage=")
      }
      else{
        req.logIn(user,(err)=>{
          var token = authenticate.getToken({_id: req.user._id});
          res.redirect(process.env.BASE_URL+"/?success=true&token="+token+"&username="+req.user.username+"&usertype="+req.user.usertype+"&garbage=");
        });
      }
    })(req,res,next);
});

/************  For All Users ****************/

router.get('/profile',cors.cors,authenticate.verifyUser,async (req,res,next)=>{
  try{
    if(req.user.usertype==="candidate"){
     var profile = await Candidate.findById(req.user._id);
    }
    else if(req.user.usertype==="company"){
      var profile = await Company.findById(req.user._id);
    } 
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    res.json(profile);
  }catch(err){
    next(err);
  }
})

router.put('/profile/update',cors.cors,authenticate.verifyUser,async (req,res,next)=>{
  try{
    var profile = await Candidate.findOneAndUpdate({_id:req.user._id},{$set:req.body});
    console.log(req.body);
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    res.json(profile);
  }catch(err){
    next(err);
  }
})


router.post('/profile/addProject',cors.cors,authenticate.verifyUser,async (req,res,next)=>{
  try{
    var profile = await Candidate.findById(req.user._id);
    profile.projects.push(req.body);
    profile.save();
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    res.json(profile);
  }catch(err){
    next(err);
  }
})


router.post('/profile/addExperience',cors.cors,authenticate.verifyUser,async (req,res,next)=>{
  try{
    var profile = await Candidate.findById(req.user._id);
    profile.experience.push(req.body);
    profile.save();
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    res.json(profile);
  }catch(err){
    next(err);
  }
})

router.post('/login',cors.cors,async (req,res,next)=>{ 
  try{
      var ch= await User.findOne({username:req.body.username});
      if(!ch){
        res.statusMessage = "Email does not exist";
        return res.status(404).end();
      }
      else if(!ch.active){
        res.statusMessage = "Your Application is still pending for approval";
        return res.status(401).end();
      }
      else{
        passport.authenticate('local', async (err,user,info)=>{ //for adding req.user property
        if(err){
          return next(err);
        }
        else if(!user){
          res.statusMessage = "Incorrect Email or Password";
          return res.status(401).end();
        }
        else{
          req.logIn(user,(err)=>{
            var token=authenticate.getToken({_id: req.user._id}); //token will be created on success and will be included in the subsequent requests header ( handled by the browser)
            res.statusCode= 200;
            res.setHeader('Content-Type','application/json');
            res.json({token:token, usertype:req.user.usertype,msg:"Login Successfull!!"}); 
          });
        }
        })(req,res,next);
      }
  } catch(err){
    next(err)
  }
});

router.post('/signup/searchemail',cors.cors,async (req,res,next)=>{
  try{ 
    var user= await User.findOne({username: req.body.username});
    var available = (user===null)?true:false;
      res.statusCode= 200;
      res.setHeader('Content-Type','application/json');
      res.json({available});    
  } catch(err){
     next(err);
  }
});

router.post('/forgetpassword',cors.cors,async (req,res,next)=>{
  try{  
    const user = await User.findOne(req.body);
    if(!user){    
      res.statusMessage = "User Not found";
      return res.status(404).end();
    }
    if(user.googleId||user.facebookId){
      res.statusMessage = "You have logged in through Facebook/Google";
      return res.status(400).end();
    }
    let token = await Token.findOne({userId: user._id});
    if(token){
      await token.deleteOne()
    }
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link= `${process.env.BASE_URL}/resetpassword/${resetToken}/${user._id}`;
    await sendEmail(user.username,"Password reset","Please go to this Link and update your password\n\n"+link+"\n\nRegards,\nTeam Coding Live");
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    res.json({msg:"Password Reset Link Sent Successfully to your Email"}); 
    
  } catch(err){
     next(err);
  }
});

router.post('/resetpassword',cors.cors,async (req,res,next)=>{
  try{
    console.log(req.body);
    let passwordResetToken = await Token.findOne({userId: req.body.userId });
    if (!passwordResetToken) {
      res.statusMessage = "Invalid or expired password reset token ";
      return res.status(401).end();
      
    }
    const isValid = await bcrypt.compare(req.body.token, passwordResetToken.token);
    if (!isValid) {
      res.statusMessage = "Invalid or expired password reset token ";
      return res.status(401).end();
    }
    let user= await User.findById(req.body.userId);
    if(!user){
      res.statusMessage = "User Not found";
      return res.status(404).end();
    }
    await user.setPassword(req.body.password);
    await user.save();
    await Token.deleteOne({userId: req.body.userId});
    sendEmail(user.username,"Password Reset Acknowledgement","Your password has been successfully reset\n\nRegards,\nTeam Coding Live")
    res.statusCode= 200;
    res.setHeader('Content-Type','application/json');
    res.json({msg:"Password Reset Successfull!! Please Login Using your new password !!"});
  }
  catch(err){
    next(err);
  }
})
          
//If the user has signed up for the first time They will be prompted to enter their basic personal details.
//From the profile section of google and facebook some info in the post-signup form 
//For local login method the post-signup form will remain empty. 


module.exports = router;
