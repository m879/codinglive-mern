var express = require('express');
var passport=require('passport');
var sendEmail=require('../mailer');
var authenticate=require('../authenticate');
var cors = require('./cors');
var router = express.Router();
router.use(express.json()); 


var User = require('../models/user');
var Company = require('../models/company');
var Vacancy =require('../models/vacancy');
var Problem =require('../models/problem');
var Candidate = require('../models/candidate');
var Appointment = require('../models/appointment');


router.options('*',cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
router.get('/vacancy/list',cors.cors,authenticate.verifyUser,async (req,res,next)=>{
    try{ 
      var date = new Date();
      var vacancies =await Vacancy.find({deadline:{$gt: date}},{"problem":0,"applicants":0,"selected":0});
      res.statusCode= 200;
      res.setHeader('Content-Type','application/json');
      res.json({vacancies:vacancies});     
    }
    catch(err){
      next(err);
    }     
  })

router.post('/vacancy/apply',cors.cors,authenticate.verifyUser,async (req,res,next)=>{
    try{  
        var candidate = await Candidate.findOne({
            $and: [
                {_id:req.user._id},   
                {'applied.vacancy':req.body.vacancyId}
            ]
        });  
        if(candidate){
            res.statusMessage = "You have already Applied for this Job";
            return res.status(409).end();
        }
        else{
            var candidate = await Candidate.findOne({_id:req.user._id});
            var vacancy = await Vacancy.findOne({_id:req.body.vacancyId});
            if(vacancy.deadline>new Date())
            {
                var appl = candidate.applied.create({vacancy:req.body.vacancyId})
                candidate.applied.push(appl)
                await candidate.save();
                vacancy.applicants.push(req.user._id);
                await vacancy.save();
                res.statusCode= 200;
                res.setHeader('Content-Type','application/json');
                res.json({msg:"You have Successfully Applied for the Job"});  
            }
            else{
                res.statusMessage = "Deadline for Application has Passed";
                return res.status(404).end();
            }
        }  
    }
    catch(err){
        console.log(err);
        next(err);
    }     
})

router.get('/application/list',cors.cors,authenticate.verifyUser,async (req,res,next)=>{
    try{  
      var applications = await Candidate.findOne({_id:req.user._id},{"_id":0,"applied":1})
      .populate({
          path : 'applied',
          populate: {
              path: 'vacancy',
              model: 'Vacancy',
              select: '_id description position commencement duration companyname'
          }
      })
        res.statusCode= 200;
        res.setHeader('Content-Type','application/json');
        res.json(applications);
    }
    catch(err){
      next(err);
    }     
})

router.get('/interview/list',cors.cors,authenticate.verifyUser,async (req,res,next)=>{
  console.log("INTERVIEW LIST API CALLING");
    try{ 
      var appointments = await Appointment.find({ candidate:req.user._id,status:"pending"},{"problem":0})
        .populate(
             {
               path : 'company',
               model: 'Company',
               select: '_id firstname lastname username phone '
             }  
           )
         .populate(
           {
             path : 'vacancy',
             model: 'Vacancy',
             select: 'position companyname description commencement duration'
           }
         )
        res.statusCode= 200;
        res.setHeader('Content-Type','application/json');
        // console.log(appoFintments);
        res.json(appointments);      
    }
    catch(err){
      console.log(err);
      next(err);
    }     
  })


router.post('/interview/problem/view',cors.cors,authenticate.verifyUser,async (req,res,next)=>{
  console.log("PROBLEM VIEW API CALL");
  try{ 
    var appointment = await Appointment.findOne({ candidate:req.user._id,_id:req.body.id});
    var problem = await Problem.findOne({_id:appointment.problem});
      res.statusCode= 200;
      res.setHeader('Content-Type','application/json');
      res.json(problem);      
  }
  catch(err){
    console.log(err);
    next(err);
  }     
}) 

router.post('/interview/problem/submit',cors.cors,authenticate.verifyUser,async (req,res,next)=>{
  try{ 
    var appointment = await Appointment.findOne({ candidate:req.user._id,_id:req.body.id});
    appointment.code= req.body.code;
    await appointment.save(); 
    res.statusCode= 200;
      res.setHeader('Content-Type','application/json');
      res.json({msg:"Code has been Submitted"});    
  }
  catch(err){
    console.log(err);
    next(err);
  }     
}) 
module.exports = router;
