const express=require('express');
const { check, validationResult } = require('express-validator');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const auth=require('../middleware/auth');

const Pharmacist=require('../models/pharmacist');

router.post('/signup',
    check('name','name is required').not().isEmpty(),
    check('email','email is required').isEmail(),
    check('password','password is required').notEmpty(),
    check('age','age is required').notEmpty(),
    check('phone','phone is required').notEmpty(),
    check('address','address is required').notEmpty(),
    async (req,res)=>{
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const {name,email,password,age,phone,address}=req.body;

        try {
            let pharmacist=await Pharmacist.findOne({email});
            if(pharmacist){
                return res.status(400).json({error:[{msg:'User is already taken'}]});
            }
            pharmacist=new Pharmacist({name,email,password,age,phone,address});
            //encrypting password
            const salt=await bcrypt.genSalt(10);
            pharmacist.password=await bcrypt.hash(password,salt);
            await pharmacist.save();
            //return json web token
            const payload={
                user:{
                    id:pharmacist.id
                }
            };

            jwt.sign(payload,config.get('jwttoken'),{expiresIn:3600},(err,token)=>{
                if(err)throw err;
                res.json({token});
            });
        } catch (error) {
            console.log(error.message);
        }
    });

router.get('/',async (req,res)=>{
        try {
            const pharmacist=await Pharmacist.find();
            res.json(pharmacist);    
        } catch (error) {
            console.log(error.message);
        }
    });
router.get('/:pharmacist_id',async (req,res)=>{
        try {
            const pharmacist=await Pharmacist.findById({_id:req.params.pharmacist_id});
            res.json(pharmacist);    
        } catch (error) {
            console.log(error.message);
        }
    });
router.post('/login',
    check('phone','phone is required').notEmpty(),
    check('password','password is required').notEmpty(),
    async(req,res)=>{
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const {phone,password}=req.body;
        try {
            const pharmacist=await Pharmacist.findOne({phone});
            if(!pharmacist){
                return res.status(400).json({error:[{msg:'Invalid credentials'}]});
            }
            
            const isMatch=await bcrypt.compare(password,pharmacist.password);
            if(!isMatch)return res.status(400).json({error:[{msg:'Invalid credentials'}]});
            //return json web token
            const payload={
                user:{
                    id:pharmacist.id
                }
            }
            jwt.sign(payload,config.get('jwttoken'),{expiresIn:3600},(err,token)=>{
                if(err)throw err;
                res.json({token});
            });
        } catch (error) {
            console.log(error.message);
        }
});

router.post('/update/:pharmacist_id',
    // auth,
    async (req,res)=>{
        const {name,email,password,age,phone,address}=req.body;
        try {
            let pharmacist=Pharmacist.findById({id:req.params.pharmacist_id});
            if(!pharmacist)return res.status(400).res({msg:'No User found'});

            const fields={};
            if(name.length != 0 )
            {
                fields.name=name;
            }
            if(email.length != 0)
            {
                fields.email=email;
            }
            if(password.length != 0)
            {
                fields.password=password;
            }
            if(age.length != 0)
            {
                fields.age=age;
            }
            if(phone.length != 0)
            {
                fields.phone=phone;
            }
            if(address.length != 0)
            {
                fields.address=address;
            }
            pharmacist=await Pharmacist.findOneAndUpdate(
                {user:req.params.pharmacist_id},
                {$set:fields},
                {new: true}
            )

            return res.json({msg:'Update Complete'});
        } catch (error) {
            console.log(error.message);
        }
});
router.delete('/:pharmacist_id',async (req,res)=>{
    try {
        await Pharmacist.findOneAndRemove({id:req.params.pharmacist_id});
        res.json({msg:'User removed'});
    } catch (err) {
        console.log(err.message);
    }
});
module.exports=router;