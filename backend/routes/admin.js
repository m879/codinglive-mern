var express = require('express');
var passport=require('passport');
var sendEmail=require('../mailer');
var authenticate=require('../authenticate');
var cors = require('./cors');
var router = express.Router();
router.use(express.json()); 


var User = require('../models/user');
var Application = require('../models/application');
var Company = require('../models/company')

router.options('*',cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})

router.get('/user/list',cors.cors,authenticate.verifyUser,authenticate.verifyAdmin, async (req, res, next) => {
  try{
    const users = await User.find({},{ "salt":0 , "hash":0});
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({users:users});
  } catch (err) {
    next(err);
  }  
});

router.get('/user/reports',cors.cors,authenticate.verifyUser,authenticate.verifyAdmin, async (req, res, next) => {
  try{
    
    const agg = [
      {
        '$group': {
          '_id': '$usertype', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          '_id': 1
        }
      }
    ];
    const usertype_list = await User.aggregate(agg);
    var total = usertype_list[0].count+usertype_list[1].count+usertype_list[2].count;
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({usertype_list:usertype_list,total:total});
  } catch (err) {
    next(err);
  }  
});

router.get('/application',cors.cors,authenticate.verifyUser,authenticate.verifyAdmin, async (req, res, next) => {
  try{
    const applications = await Application.find();
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({applications: applications});
  } catch (err) {
    next(err);
  }  
});

router.post('/application/approval',cors.cors,/*authenticate.verifyUser,authenticate.verifyAdmin,*/ async (req, res, next) => {
  try{
    var applicant= await Application.findOne({_id:req.body._id},{"_id":0});
    if(!applicant){
      res.statusMessage = "Application not Found";
      return res.status(404).end();
    }
    var user = await User.findOne({username:applicant.username});
    if(!user){
      await Application.deleteOne({username:applicant.username});
      res.statusMessage = "User not Found";
      return res.status(404).end();
    }
    else if(req.body.approve){
      user.active= true;
      await user.save();
      var comp = new Company(applicant._doc);
      comp._id=user._id;
      await comp.save();
      await sendEmail(applicant.username,"Account Approval Status","Congratulations !! Your Application for Account Creation has been approved. Please Login to your account with the credentials you have registered.\n\nThank You,\nTeam Coding Live");         
    }
    else{
      await User.deleteOne({username:applicant.username});
      await sendEmail(applicant.username,"Account Approval Status","We have to inform you with great regret that your Application for Account Creation has been rejected.If you feel this is a mistake, please contact us or ReApply.\n\nRegards,\nTeam Coding Live");
    }
    await Application.deleteOne({username:applicant.username});
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({msg: "Application has been "+(req.body.approve?"Accepted":"Rejected")+". Fetching Updated List Now..."});
  } catch (err) {
    next(err);
  }  
});

module.exports = router;