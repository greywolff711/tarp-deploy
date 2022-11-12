const express=require('express');
const { check, validationResult } = require('express-validator');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const auth=require('../middleware/auth');

const Medicine=require('../models/medicine');

router.post('/',
    // auth,
    check('name','name required').notEmpty(),
    check('description','Description Required').notEmpty(),
    check('count','Count required').notEmpty(),
    async (req,res)=>{
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {name,description,count}=req.body;

        try {
            let newName=name.toLowerCase();
            let medicine=new Medicine({"name":newName,description,count});
            await medicine.save();
            console.log(medicine)
            res.json({msg:'Medicine Saved'});
        } catch (error) {
            console.log(error.message);
        }
    })

router.get('/',async (req,res)=>{
    try {
        const medicines=await Medicine.find();
        res.json(medicines);    
    } catch (error) {
        console.log(error.message);
    }
});

router.post('/quantity',async(req,res)=>{
    const {quantity,name}=req.body;
    const med=await Medicine.find({name});
    // console.log(med[0].count)
    if(quantity>med[0].count)return res.json({msg:'INVALID QUANTITY'});
    else {
        const fields={};
        fields.count = Number(Number(med[0].count)-quantity);
        try{
            let r = await Medicine.findOneAndUpdate(
              {_id: med[0]._id},
              {$set:fields},
              {new: true}
            );
        }
        catch(err){
            console.log(err);
        }
        return res.json({msg:'ADDED TO THE MEDICINES'})
    }
})

router.get('/:medicine_id',async(req,res)=>{
    try {
        let medSearch=req.params.medicine_id.toLocaleLowerCase();
        const medicine=await Medicine.find({name:medSearch});
        if(!medicine)return res.status(400).json({error:[{msg:'Invalid ID'}]});
        res.json(medicine);
    } catch (error) {
        console.log(error.message);
    }
})

router.delete('/:medicine_id',
// auth,
async(req,res)=>{
    try {
        const medicine=await Medicine.findByIdAndRemove({_id:req.params.medicine_id});
        if(!medicine)return res.status(400).json({error:[{msg:'Invalid ID'}]});
        res.json('medicine Removed');
    } catch (error) {
        console.log(error.message);
    }
})

router.post('/:medicine_id',
    // auth,
    // check('name','name is required').notEmpty(),
    // check('description','description is required').notEmpty(),
    // check('count','count is required').notEmpty(),
    async(req,res)=>{
        // errors=validationResult(req);
        // if(!errors.isEmpty()){
        //     return res.status(400).json({errors:errors.array()});
        // }

        const {name,description,count}=req.body;
        try {
            const fields={};
            if(name.length != 0 )
            {
                fields.name=name;
            }
            if(description.length != 0 )
            {
                fields.description=description;
            }
            if(count.length != 0 )
            {
                fields.count=count;
            }
            let medicine=await Medicine.findById({_id:req.params.medicine_id});
            if(!medicine){
                return res.status(400).json({error:[{msg:'Invalid ID'}]});
            }
            medicine=await Medicine.findOneAndUpdate(
                {_id:req.params.medicine_id},
                {$set:fields},
                {new: true}
            )
            return res.json({msg:'Update Complete'});
        } catch (error) {
            console.log(error.message);
        }
    })
module.exports=router;