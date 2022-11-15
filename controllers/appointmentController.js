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
  const{from}=req.body;
  // console.log(date);
  const appoint=await AppointmentSlot.find({date:new Date(from)});
  if(appoint.length!=0)return res.json(appoint[0].timing);
  else return res.json([]);
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
      const {from,timing,symptoms,patient,doctor,paid}=req.body;
      console.log(req.body)
      const fields={};
      // if(from.length != 0 )
      // {
      //   fields.from=from;
      // }
      // if(to.length != 0)
      // {
      //   fields.to=to;
      // }
      if(timing.length!=0){
        let slot=await AppointmentSlot.findOne({date:new Date(from)});
        let appointment=await Appointment.findById({_id:req.params.appointment_id});
        // let fields1={};
        // fields1.timing=timing;
        // await AppointmentSlot.updateOne({_id:slot._id,timing:appointment.timing},fields1);
        // slot.timing.unshift(timing);
          console.log(appointment)
        // await slot.save();
        // console.log(appointment.timing);
        // console.log(slot);
        if(slot!=null){
          // newSlot=slot.timing;
          // newSlot.splice(newSlot.findIndex(e => e === appointment.timing),1);
          // // console.log(slot);
          // newSlot.push(timing);
          // // console.log(slot);
          // await slot.save();
          if(slot.timing.length!=0){
            oldSlot=await AppointmentSlot.findOne({date:new Date(appointment.date)});
            // console.log(oldSlot);
            oldSlot.timing.splice(oldSlot.timing.findIndex(e => e === appointment.timing),1);
            // console.log(oldSlot);
            oldSlot.timing.unshift(timing);
            // console.log(oldSlot);
            await oldSlot.save();
          }
          else{
            slot.timing.unshift(timing);
            console.log(slot);
            await slot.save();
          }
          // console.log(newSlot)
          // await slot.save();
        }
        else{
          let newSlot=new AppointmentSlot({date:new Date(from)});
          oldSlot=await AppointmentSlot.findOne({date:new Date(appointment.date)});
          oldSlot.timing.splice(oldSlot.timing.findIndex(e => e === appointment.timing),1);
          // console.log(oldSlot.timing);
          await oldSlot.save();
          newSlot.timing.unshift(timing);
          // console.log(newSlot)
          await newSlot.save();
          // res.json({msg:"Appointment made"});
        }
        fields.timing=timing;
        fields.date=from;
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

router.get('/getDate/date',
async(req,res)=>{
  try {
    const {date}=req.body;
    console.log("date");
    const appointments = await Appointment.find({date});
    res.status(200).json(appointments);
  } catch (err) {
      console.log(err.message);
  }
})

router.get('/slots/today',async(req,res)=>{
  try {
    var start = new Date();
    start.setUTCHours(0,0,0);
    start.setUTCMilliseconds(0);
    console.log(start)
    const appointments = await Appointment.find({date:start});
    res.json(appointments);
  } catch (error) {
    console.log(err.message);
  }
})

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
      const {from,timing,symptoms,paid}=req.body;
      let date=from;
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
      // console.log(timing)
      // console.log(doctor[0]._id);
      await newAppointment.save();
      let slot=await AppointmentSlot.findOne({date});
      if(slot===null){
        let newSlot=new AppointmentSlot({date});
        newSlot.timing.unshift(timing);
        await newSlot.save();
        res.json({msg:"Appointment made"});
      }
      else{
        // console.log(slot)
        slot.timing.unshift(timing);
        await slot.save();
        res.json({msg:"Appointment made"});
      }
  } catch (error) {
      console.log(error);
      return res.json({err:error.message});
  }
  
})

router.delete("/:appointment_id/:appointment_date/:appointment_timing", async (req, res) => {
    try {
      await Appointment.findOneAndDelete({ _id: req.params.appointment_id });
      let slot=await AppointmentSlot.findOne({date:new Date(req.params.appointment_date)});
      await AppointmentSlot.updateOne({_id:slot._id},{ $pull: {timing:req.params.appointment_timing} });
      res.json({ msg: "Appointment deleted successfully." });
    } catch (err) {
      console.log(err);
    }
  });
module.exports=router;