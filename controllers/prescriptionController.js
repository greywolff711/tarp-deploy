const express = require("express");
const router = express.Router();

const config = require("config");
const auth = require("../middleware/auth");

const Prescription = require("../models/prescription");
const Inpatient=require('../models/inpatient');
const Outpatient=require('../models/outpatient');
const Medicine=require('../models/medicine');

router.post("/", async (req, res) => {
  try {
    // add the doctor id from the req pro
    const { doctor,patient, medicine, instructions } = req.body;
    inpatient_fetch=await Inpatient.find({phone:patient});
    outpatient_fetch=await Outpatient.find({phoneNo:patient});
    let patient_id=null;
    if(inpatient_fetch.length===0&&outpatient_fetch.length!=0){patient_id=outpatient_fetch[0]._id;}
    else if(outpatient_fetch.length===0&&inpatient_fetch.length!=0) patient_id=inpatient_fetch[0]._id;
    else patient_id=inpatient_fetch[0]._id;
    let doctor_fetch=await Doctor.find({phone :doctor});
    let doctor_id=doctor_fetch[0]._id;
    if(patient_id==null||doctor_id==undefined)return res.json({msg:'Invalid Phone numbers'})
    // console.log(patient_id);
    let medicine_fetch=await Medicine.find({name:medicine});
    if(medicine_fetch===undefined)return res.json({msg:'Invalid Medicine Name'})
    const fields = {};
    console.log(medicine_fetch[0].count);
    fields.count = Number(Number(medicine_fetch[0].count)-1);
    try{
      let r = await Medicine.findOneAndUpdate(
        {_id: medicine_fetch[0]._id},
        {$set:fields},
        {new: true}
      );
    }
    catch(err){
        console.log(err);
    }
    const prescription = new Prescription({
      doctor:doctor_id,
      patient:patient_id,
      medicine,
      instructions,
    });
    await prescription.save();
    res.json(prescription);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const prescription = await Prescription.find();
    res.json(prescription);
  } catch (err) {
    console.log(err.message);
  }
});

router.patch("/:id", async (req, res) => {
    try {
        const { patient, medicine, instructions } = req.body;
        const prescription = await Prescription.findById({_id: req.params.id});
        if (!prescription) return res.status(400).json({ msg: "No prescription found" });
        const fields = {};
        if (patient.length != 0) {
          inpatient_fetch=await Inpatient.find({phone:patient});
          outpatient_fetch=await Outpatient.find({phoneNo:patient});
          let patient_id=null;
          console.log(inpatient_fetch)
          if(inpatient_fetch.length===0&&outpatient_fetch.length!=0){patient_id=outpatient_fetch[0]._id;}
          else if(outpatient_fetch.length===0&&inpatient_fetch.length!=0) patient_id=inpatient_fetch[0]._id;
          else patient_id=inpatient_fetch[0]._id;
          fields.patient = patient_id;
          console.log(fields.patient);
        }
        if (medicine.length != 0) {
            let medicine_fetch=await Medicine.find({name:medicine});
            let id_med=await Medicine.find({name:prescription.medicine});
            if(medicine_fetch[0].name!=id_med[0].name){
              if(medicine_fetch===undefined)return res.json({msg:'Invalid Medicine Name'});
              const fields2 = {};
              // console.log(medicine_fetch[0].count);
              fields2.count = Number(Number(medicine_fetch[0].count)-1);
              
              try{
                let r = await Medicine.findOneAndUpdate(
                  {_id: medicine_fetch[0]._id},
                  {$set:fields2},
                  {new: true}
                );
              }
              catch(err){
                  console.log(err);
              }
              const fields_1 = {};
              // console.log(medicine_fetch[0].count);
              fields_1.count = Number(Number(id_med[0].count)+1);
              try{
                let r = await Medicine.findOneAndUpdate(
                  {_id: id_med[0]._id},
                  {$set:fields_1},
                  {new: true}
                );
              }
              catch(err){
                  console.log(err);
              }
            }
            fields.medicine = medicine;
        }
        if (instructions.length != 0) {
            fields.instructions = instructions;
        }
        try{
          let r = await Prescription.findOneAndUpdate(
            {_id: req.params.id},
            {$set:fields},
            {new: true}
          );
          res.status(200).json({msg:"Updated successfully"})
        }
        catch(err){
            console.log(err);
        }
    } catch (error) {
        console.log(error.message);
    }
});

router.delete("/:doctor_id", async (req, res) => {
    try {
        await Prescription.findOneAndRemove({ _id:req.params.doctor_id });
        res.json({ msg: "Prescription removed" });
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;
