const express=require('express');
const { check, validationResult } = require('express-validator');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const auth=require('../middleware/auth');

const Admin=require('../models/admin');

router.post('/signup',
    check('name','name is required').not().isEmpty(),
    check('email','email is required').isEmail(),
    check('password','password is required').notEmpty(),
    check('phone','phone is required').notEmpty(),
    async (req,res)=>{
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const {name,email,password,phone}=req.body;

        try {
            let admin=await Admin.findOne({email});
            if(admin){
                return res.status(400).json({error:[{msg:'User is already taken'}]});
            }
            admin=new Admin({name,email,password,phone});
            //encrypting password
            const salt=await bcrypt.genSalt(10);
            admin.password=await bcrypt.hash(password,salt);
            await admin.save();
            //return json web token
            const payload={
                user:{
                    id:admin.id
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
            const admin=await Admin.findOne({phone});
            if(!admin){
                return res.status(400).json({error:[{msg:'Invalid credentials'}]});
            }
            
            const isMatch=await bcrypt.compare(password,admin.password);
            if(!isMatch)return res.status(400).json({error:[{msg:'Invalid credentials'}]});
            //return json web token
            const payload={
                user:{
                    id:admin.id
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


module.exports=router;