const express=require('express');
const router=express.Router();
const { check, validationResult } = require('express-validator');
const Inpatient=require('../models/inpatient');
const Appointment=require('../models/appointment');
const Doctor=require('../models/doctor');
var ObjectID = require('mongodb').ObjectID;

router.post('/:patient_id/:doctor_id',async(req,res)=>{
    try {
      console.log(req.params.patient_id);
        let inpatient=await Inpatient.findById({_id: new ObjectID(req.params.patient_id)});
        // console.log(inpatient.name);
        let doctor=await Doctor.findById({_id: new ObjectID(req.params.doctor_id)});
        const {from,to,symptoms,paid}=req.body;
        let newAppointment=new Appointment({
            from:from,
            to:to,
            symptoms:symptoms,
            patient:inpatient._id,
            doctor:doctor,
            paid:paid
        });
        await newAppointment.save();
        res.json({msg:"Appointment made"});
    } catch (error) {
        console.log(error);
    }
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
        fields.patient=patient;
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

router.delete("/:appointment_id", async (req, res) => {
    try {
      await Appointment.findOneAndDelete({ _id: req.params.appointment_id });
      res.json({ msg: "Appointment deleted successfully." });
    } catch (err) {
      console.log(err);
    }
  });
module.exports=router;