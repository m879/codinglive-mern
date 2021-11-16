var express = require('express');
var passport = require('passport');
var sendEmail = require('../mailer');
var authenticate = require('../authenticate');
var cors = require('./cors');
var router = express.Router();
router.use(express.json());

var User = require('../models/user');
var Company = require('../models/company');
var Vacancy = require('../models/vacancy');
var Problem = require('../models/problem');
var Candidate = require('../models/candidate');
var Appointment = require('../models/appointment');

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
router.post('/vacancy/create', cors.cors, authenticate.verifyUser, async (req, res, next) => {
  try {
    const vacancy = new Vacancy(req.body.VacancyInfo);
    const problem = new Problem(req.body.ProblemInfo);
    await problem.save();
    vacancy.problem = problem._id;
    await vacancy.save();

    var company = await Company.findById(req.user._id);
    company.vacancies.push(vacancy._id);
    await company.save();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ msg: "Vacancy Posted Successfully !!" });
  }
  catch (err) {
    console.log(err);
    next(err);
  }
})

router.get('/vacancy/list', cors.cors, authenticate.verifyUser, async (req, res, next) => {
  try {
    var vacancies = await Company.findOne({ _id: req.user._id }, { "_id": 0, "vacancies": 1 })
      .populate({
        path: 'vacancies',
        model: 'Vacancy'
      });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(vacancies);
  }
  catch (err) {
    console.log(err);
    next(err);
  }
})

router.post('/applicant/list', cors.cors, authenticate.verifyUser, async (req, res, next) => {
  try {
    var company = await Company.findOne({
      $and: [
        { _id: req.user._id },
        { vacancies: req.body.vacancyId }
      ]
    });
    if (!company) {
      res.statusMessage = "Vacancy does not exist";
      return res.status(404).end();
    }
    else {
      var applicants = await Vacancy.findOne({ _id: req.body.vacancyId }, { "_id": 0, "applicants": 1 })
        .populate({
          path: 'applicants',
          model: 'Candidate',
          select: '_id firstname lastname username phone about college degree passing_year skills projects experience'
        });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(applicants);
    }
  }
  catch (err) {
    console.log(err);
    next(err);
  }
})

router.post('/application/approval', cors.cors, authenticate.verifyUser, async (req, res, next) => {
  try {
    var company = await Company.findOne({  //Searching if the vacancy matches for a company
      $and: [
        { _id: req.user._id },
        { vacancies: req.body.vacancyId }
      ]
    });
    if (!company) {
      res.statusMessage = "Vacancy does not exist";
      return res.status(404).end();
    }
    else {
      await Vacancy.updateOne(             //Deleting the application from vacancy
        { _id: req.body.vacancyId },
        { $pull: { applicants: req.body.applicantId } }
      );
      var candidate = await Candidate.findOne({  //Checking if the Candidate has applied for the vacancy
        _id: req.body.applicantId,
        'applied.vacancy': req.body.vacancyId,
        'applied.status': "pending"
      })
      if (candidate) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        if (req.body.approve) {
          var vacancy = await Vacancy.findById({ _id: req.body.vacancyId });
          vacancy.selected.push(req.body.applicantId);
          await vacancy.save();
          await new Appointment({
            vacancy: req.body.vacancyId, candidate: req.body.applicantId, company: req.user._id, problem: vacancy.problem, meetinglink: "http://localhost:3000/"
          }).save();
          await Candidate.updateOne(
            { _id: req.body.applicantId, 'applied.vacancy': req.body.vacancyId },
            { $set: { "applied.$.status": "You have been Shortlisted for Interview" } }
          );
          res.json({ msg: "The Candidate has been ShortListed" });
        }

        else {
          await Candidate.updateOne(
            { _id: req.body.applicantId, 'applied.vacancy': req.body.vacancyId },
            { $set: { "applied.$.status": "You have NOT been Shortlisted for Interview" } }
          );
          res.json({ msg: "The Candidate has NOT been ShortListed" });
        }

      }
      else {
        res.statusMessage = "Candidate Application does not exist ";
        return res.status(404).end();
      }
    }
  }
  catch (err) {
    console.log(err);
    next(err);
  }
})

router.get('/interview/list', cors.cors, authenticate.verifyUser, async (req, res, next) => {
  try {
    var appointments = await Appointment.find({ company: req.user._id })
      .populate(
        {
          path: 'candidate',
          model: 'Candidate',
          select: '_id firstname lastname username phone '
        }
      )
      .populate(
        {
          path: 'vacancy',
          model: 'Vacancy',
          select: 'position companyname description commencement duration'
        }
      )
      .populate(
        {
          path: 'problem',
          model: 'Problem',
        }
      )
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(appointments);

  }
  catch (err) {
    console.log(err);
    next(err);
  }
})


router.post('/selection',cors.cors,authenticate.verifyUser,async (req,res,next)=>{
  try{ 
    var appointment = await Appointment.findOne({ company:req.user._id,_id:req.body.id})      
    appointment.status = req.body.status;
    await appointment.save();
    var candidate = await Candidate.findOne({candidate: appointment.candidate});
    await Candidate.updateOne(
      {_id:appointment.candidate,'applied.vacancy':appointment.vacancy},
      { $set : {  "applied.$.status":"You are "+req.body.status+" for next round"}}
     );

    res.statusCode= 200;
      res.setHeader('Content-Type','application/json');
      res.json({msg: "Candidate is "+req.body.status}); 

      //Send Notification to candidate abou result here.
  }
  catch(err){
    console.log(err);
    next(err);
  }     
})



router.get('/dashboard',cors.cors, authenticate.verifyUser,async(req,res)=>{
  console.log("DASHBOARD CALLING API");
  var allUser=await User.countDocuments() ;
  var allCompany=await Company.countDocuments() ;
  var allVacancy=await Vacancy.countDocuments() ;
  var allCandidate=await Candidate.countDocuments() ;
  var allAppointment=await Appointment.countDocuments() ;
 
  const totalData={allUser,allCompany,allVacancy,allCandidate,allAppointment};
  // console.log(totalData);
  res.json(totalData);

});

module.exports = router;

