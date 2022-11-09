const express=require('express');
const { check, validationResult } = require('express-validator');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');

const Bill=require('../models/bill');
const Inpatient=require('../models/inpatient');
const Outpatient=require('../models/outpatient');

router.post('/',
check('phone','phone is required').not().isEmpty(),
check('cost','cost is required').not().isEmpty(),
check('status','status is required').notEmpty(),
async(req,res)=>{
    errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {phone,cost,status}=req.body;
    inpatient_fetch=await Inpatient.find({phone:phone});
    outpatient_fetch=await Outpatient.find({phoneNo:phone});
    let patient_id=null;
    if(inpatient_fetch.length===0&&outpatient_fetch.length!=0){patient_id=outpatient_fetch[0]._id;}
    else if(outpatient_fetch.length===0&&inpatient_fetch.length!=0) patient_id=inpatient_fetch[0]._id;
    else patient_id=inpatient_fetch[0]._id;
    if(patient_id==null)return res.json({msg:'Invalid Phone numbers'})
    console.log(patient_id);
    try {
        let bill=new Bill({patient:patient_id,cost,status});
        await bill.save();
        res.json({msg:'Bill saved'});
    } 
    catch (error) {
        console.log(error);
    }
});

router.post(
    "/:bill_id",
    // auth,
    async (req, res) => {
      const {phone,cost,status}=req.body;
    //   console.log(req.body);
      const fields={};
      if(phone.length != 0 )
      {
        inpatient_fetch=await Inpatient.find({phone:phone});
        outpatient_fetch=await Outpatient.find({phoneNo:phone});
        let patient_id=null;
        if(inpatient_fetch.length===0&&outpatient_fetch.length!=0){patient_id=outpatient_fetch[0]._id;}
        else if(outpatient_fetch.length===0&&inpatient_fetch.length!=0) patient_id=inpatient_fetch[0]._id;
        else patient_id=inpatient_fetch[0]._id;
        if(patient_id==null)return res.json({msg:'Invalid Phone numbers'})
        fields.patient=patient_id;
      }
      if(cost.length != 0)
      {
        fields.cost=cost;
      }
      if(status ==="false")
      {
        fields.status=false
      }
      if(status ==="true"){
        fields.status=true
      }

      try{
          let r = await Bill.findOneAndUpdate(
            {_id: req.params.bill_id},
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

router.delete("/:bill_id",async (req, res) => {
    try {
      await Bill.findOneAndDelete({ _id: req.params.bill_id });
      res.json({ msg: "Bill deleted successfully." });
    } catch (err) {
      console.log(err);
    }
});

router.get('/',async(req,res)=>{
  try {
      const appointments = await Bill.find();
      res.status(200).json(appointments);
  } catch (err) {
      console.log(err.message);
  }
})

module.exports=router;