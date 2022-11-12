const express=require('express');
const { check, validationResult } = require('express-validator');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');

const MedicalRecord=require('../models/medicalRecord');

router.post('/',
    check('patient', 'patient is required').notEmpty(),
    check('consultation', 'consultation is required').notEmpty(),
    check('tests', 'tests is required').notEmpty(),
    check('xray', 'xray is required').notEmpty(),
    check('extra', 'extra is required').notEmpty(),
    async(req,res)=>{
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const {patient,consultation,tests,xray,extra}=req.body;
        try {
            let mr=new MedicalRecord({patient,consultation,tests,xray,extra});
            await mr.save();
            res.json({msg:'Record saved'});
        } 
        catch (error) {
            console.log(error);
        }
    })

router.get('/',async(req,res)=>{
        try {
            const appointments = await Bill.find();
            res.status(200).json(appointments);
        } catch (err) {
            console.log(err.message);
        }
      })

      
module.exports=router;