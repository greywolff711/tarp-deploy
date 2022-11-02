const express=require('express');
const { check, validationResult } = require('express-validator');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const auth=require('../middleware/auth');

const OutPatient=require('../models/outpatient');
router.post(
    '/signup',
    check('name','name is required').not().isEmpty(),
    check('email','email is required').isEmail(),
    check('password','password is required').notEmpty(),
    // check('age','age is required').notEmpty(),
    check('phone','phone is required').notEmpty(),
    // check('bookedRooms','room is required').notEmpty(),
    check('address','address is required').notEmpty(),
    check('gender','gender is required').notEmpty()
    ,
    async (req,res)=>{
        console.log(req.body);
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {name,email,password,age,phone,address,gender}=req.body;

        try{
            let outPatient=await OutPatient.findOne({email});
            if(outPatient){
                return res.status(400).json({error:[{msg:'User is already taken'}]});
            }

            outPatient=new OutPatient({name,email,password,age,phoneNo:phone,address,gender});

            //encrypting password
            const salt=await bcrypt.genSalt(10);
            outPatient.password=await bcrypt.hash(password,salt);
            await outPatient.save();
            //return json web token
            const payload={
                user:{
                    id:outPatient.id
                }
            };
            jwt.sign(payload,config.get('jwttoken'),{expiresIn:3600},(err,token)=>{
                if(err)throw err;
                res.json({token});
            });
        }
        catch(err){
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

router.delete('/:inpatient_id',async (req,res)=>{
    try {
        await OutPatient.findOneAndRemove({id:req.params.inpatient_id});
        res.json({msg:'User removed'});
    } catch (err) {
        console.log(err.message);
    }
});

router.post('/login',
    check('phone','phone required').notEmpty(),
    check('password','Password required').notEmpty(),
    async (req,res)=>{
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {phone,password}=req.body;
        try {
            let outpatient=await OutPatient.findOne({phone});
            if(!outpatient){
                return res.status(400).json({error:[{msg:'Invalid credentials'}]});
            }
            
            const isMatch=await bcrypt.compare(password,outpatient.password);
            if(!isMatch)return res.status(400).json({error:[{msg:'Invalid credentials'}]});
            //return json web token
            outpatient.count += 1
            await outpatient.save()
            const payload={
                user:{
                    id:outpatient.id
                }
            }
            jwt.sign(payload,config.get('jwttoken'),{expiresIn:3600},(err,token)=>{
                if(err)throw err;
                res.json({token});
            });
        } catch (err) {
            console.log(err.message);
        }
    })
    router.post('/update/:outpatient_id',
    // auth,
    // check('age','Age required').notEmpty(),
    async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty())return res.status(400).json({errors:errors.array()});
        const {name,email,age,phone,address}=req.body;
        try {
            // const receptionist=Receptionist.findById({id:req.params.receptionist_id});
            // if(!receptionist)return res.status(400).res({msg:'No User found'});

            const fields={};
            
            if(name.length !=0)
            {
                fields.name=name;
            }
            if(age.length !=0)
            {
                fields.age=age;
            }
            if(email.length !=0)
            {
                fields.email=email;
            }
            if(phone.length !=0)
            {
                fields.phone=phone;
            }
            if(address.length !=0)
            {
                fields.address=address;
            }
            let receptionist=await OutPatient.findOneAndUpdate(
                {user:req.params.outpatient_id},
                {$set:fields},
                {new: true}
            )

            return res.json({msg:'Update Complete'});
        } catch (error) {
            console.log(error.message);
        }
        
    })

router.get('/',async(req,res)=>{
        try {
            const outpatient=await OutPatient.find();
            res.json(outpatient);
        } catch (err) {
            console.log(err.message);
        }
})

router.get('/:outpatient_id',async(req,res)=>{
    try {
        const outpatient=await OutPatient.findById({_id:req.params.outpatient_id});
        res.json(outpatient);
    } catch (err) {
        console.log(err.message);
    }
})
module.exports=router;