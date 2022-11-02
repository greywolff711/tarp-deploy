const express=require('express');
const { check, validationResult } = require('express-validator');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');

const Bill=require('../models/bill');

router.post('/',
check('name','name is required').not().isEmpty(),
check('cost','cost is required').not().isEmpty(),
check('status','status is required').notEmpty(),
async(req,res)=>{
    errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {name,cost,status}=req.body;
    try {
        let bill=new Bill({name,cost,status});
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
      const {name,cost,status}=req.body;
    //   console.log(req.body);
      const fields={};
      if(name.length != 0 )
      {
        fields.name=name;
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

module.exports=router;