const express=require('express');
const router=express.Router();
const { check, validationResult } = require('express-validator');
const Inpatient=require('../models/inpatient');
const Outpatient=require('../models/outpatient');
const Appointment=require('../models/appointment');
const AppointmentSlot=require('../models/AppointmentSlot');
const Doctor=require('../models/doctor');
var ObjectID = require('mongodb').ObjectID;

router.post('/:patient_id/:doctor_id',async(req,res)=>{
    try {
      // console.log(req.params.doctor_id);
      inpatient_fetch=await Inpatient.find({phone:req.params.patient_id});
      outpatient_fetch=await Outpatient.find({phoneNo:req.params.patient_id});
      let patient_id=null;
      if(inpatient_fetch.length===0){patient_id=outpatient_fetch[0]._id;}
      else patient_id=inpatient_fetch[0]._id;
        // console.log(inpatient.name);
        let doctor=await Doctor.find({phone :req.params.doctor_id});
        // console.log(doctor);
        const {date,from,to,symptoms,paid}=req.body;
        let prevBooking=await Appointment.findOne({date:date});
        if(prevBooking!=undefined){
          let bdate=new Date(date);
          let pdate=new Date(prevBooking.date);
          if(bdate.getUTCFullYear()===pdate.getUTCFullYear()&&bdate.getUTCMonth()==pdate.getUTCMonth()&&bdate.getUTCDate()==pdate.getUTCDate()){
            if((from<=prevBooking.from&&(to<=prevBooking.to||to>=prevBooking.from))||(from>=prevBooking.from&&to<=prevBooking.to)||((from<=prevBooking.to||from<=prevBooking.from)&&to>=prevBooking.to)){
              return res.json({msg:'Slot booked'});
            }
          }
        }
        let newAppointment=new Appointment({
            date,
            from:from,
            to:to,
            symptoms:symptoms,
            patient:patient_id,
            doctor:doctor[0]._id,
            paid:paid
        });
        // console.log(doctor[0]._id);
        await newAppointment.save();
        res.json({msg:"Appointment made"});
    } catch (error) {
        console.log(error);
    }
})

router.post('/slottime',async(req,res)=>{
  const{date}=req.body;
  const appoint=await AppointmentSlot.find({date:new Date(date)});
  return res.json(appoint[0].timing);
})

router.get('/:patient_id',async(req,res)=>{
    try {
        let appointment = await Appointment.find({ patient: req.params.patient_id });
        res.status(200).json(appointment);
    } catch (error) {
        console.log(error.message);
    }
})
router.get('/app/:app_id',async(req,res)=>{
  try {
      let appointment = await Appointment.find({ _id: req.params.app_id });
      res.status(200).json(appointment);
  } catch (error) {
      console.log(error.message);
  }
})

router.post(
    "/:appointment_id",
    // auth,
    async (req, res) => {
      const {from,to,symptoms,patient,doctor,paid}=req.body;
      console.log(req.body)
      const fields={};
      if(from.length != 0 )
      {
        fields.from=from;
      }
      if(to.length != 0)
      {
        fields.to=to;
      }
      if(symptoms.length !=0)
      {
        fields.symptoms=symptoms;
      }
      if(patient.length !=0)
      {
        inpatient_fetch=await Inpatient.find({phone:patient});
        outpatient_fetch=await Outpatient.find({phoneNo:patient});
        let patient_id=null;
        if(inpatient_fetch.length===0){patient_id=outpatient_fetch[0]._id;}
        else patient_id=inpatient_fetch[0]._id;    
        fields.patient=patient_id;
      }
      if(doctor.length !=0)
      {
        fields.doctor=doctor;
      }
      if(paid ==="false")
      {
        fields.paid=false
      }
      if(paid ==="true"){
        fields.paid=true
      }
    //   console.log(fields.query)
      try{
          // let r = await Query.findOneAndUpdate({_id: req.params.query_id},{status});
          
          let r = await Appointment.findOneAndUpdate(
            {_id: req.params.appointment_id},
            {$set:fields},
            {new: true}
          );
          res.status(200).json({msg:"Updated successfully"})
      }
      catch(err){
          console.log(err);
      }
    }
  );

router.get('/',async(req,res)=>{
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        console.log(err.message);
    }
})

//@trial route
router.post('/slot/:patient_id/:doctor_id',async(req,res)=>{
  try {
    // console.log(req.params.doctor_id);
    inpatient_fetch=await Inpatient.find({phone:req.params.patient_id});
    outpatient_fetch=await Outpatient.find({phoneNo:req.params.patient_id});
    let patient_id=null;
    if(inpatient_fetch.length===0){patient_id=outpatient_fetch[0]._id;}
    else patient_id=inpatient_fetch[0]._id;
      let doctor=await Doctor.find({phone :req.params.doctor_id});
      const {date,timing,symptoms,paid}=req.body;
      // let prevBooking=await Appointment.findOne({date:date});
      // if(prevBooking!=undefined){
      //   let bdate=new Date(date);
      //   let pdate=new Date(prevBooking.date);
      //   if(bdate.getUTCFullYear()===pdate.getUTCFullYear()&&bdate.getUTCMonth()==pdate.getUTCMonth()&&bdate.getUTCDate()==pdate.getUTCDate()){
      //     if((from<=prevBooking.from&&(to<=prevBooking.to||to>=prevBooking.from))||(from>=prevBooking.from&&to<=prevBooking.to)||((from<=prevBooking.to||from<=prevBooking.from)&&to>=prevBooking.to)){
      //       return res.json({msg:'Slot booked'});
      //     }
      //   }
      // }
      let newAppointment=new Appointment({
          date,
          timing,
          symptoms:symptoms,
          patient:patient_id,
          doctor:doctor[0]._id,
          paid:paid
      });
      // console.log(doctor[0]._id);
      await newAppointment.save();
      let slot=new AppointmentSlot({date});
      slot.timing.unshift(timing);
      await slot.save();
      res.json({msg:"Appointment made"});
  } catch (error) {
      console.log(error);
  }
  
})

router.delete("/:appointment_id", async (req, res) => {
    try {
      await Appointment.findOneAndDelete({ _id: req.params.appointment_id });
      res.json({ msg: "Appointment deleted successfully." });
    } catch (err) {
      console.log(err);
    }
  });
module.exports=router;