const express=require('express');
const { check, validationResult } = require('express-validator');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const auth=require('../middleware/auth');

const Inpatient=require('../models/inpatient');
router.post(
    '/signup',
    check('name','name is required').not().isEmpty(),
    check('email','email is required').isEmail(),
    check('password','password is required').notEmpty(),
    check('age','age is required').notEmpty(),
    check('phone','phone is required').notEmpty(),
    check('bookedRooms','room is required').notEmpty(),
    check('address','address is required').notEmpty(),
    check('gender','gender is required').notEmpty()
    ,
    async (req,res)=>{
        console.log(req.body);
        errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {name,email,password,age,phone,address,bookedRooms,gender}=req.body;

        try{
            let inpatient=await Inpatient.findOne({email});
            if(inpatient){
                return res.status(400).json({error:[{msg:'User is already taken'}]});
            }

            inpatient=new Inpatient({name,email,password,age,phone,address,bookedRooms,gender});

            //encrypting password
            const salt=await bcrypt.genSalt(10);
            inpatient.password=await bcrypt.hash(password,salt);
            await inpatient.save();
            //return json web token
            const payload={
                user:{
                    id:inpatient.id
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

router.post('/update/:inpatient_id',
    // auth,
    // check('age','Age required').notEmpty(),
    async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty())return res.status(400).json({errors:errors.array()});
        const {name,email,age,phone,address,bookedRooms}=req.body;
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
            if(bookedRooms.length !=0)
            {
                fields.bookedRooms=bookedRooms;
            }
            let receptionist=await Inpatient.findOneAndUpdate(
                {user:req.params.inpatient_id},
                {$set:fields},
                {new: true}
            )

            return res.json({msg:'Update Complete'});
        } catch (error) {
            console.log(error.message);
        }
        
    })

router.delete('/:inpatient_id',async (req,res)=>{
    try {
        await Inpatient.findOneAndRemove({id:req.params.inpatient_id});
        res.json({msg:'User removed'});
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/:inpatient_id',async (req,res)=>{
    try {
        let query = await Inpatient.findOne({ _id: req.params.inpatient_id });
        res.status(200).json(query);
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
            let inpatient=await Inpatient.findOne({phone});
            if(!inpatient){
                return res.status(400).json({error:[{msg:'Invalid credentials'}]});
            }
            
            const isMatch=await bcrypt.compare(password,inpatient.password);
            if(!isMatch)return res.status(400).json({error:[{msg:'Invalid credentials'}]});
            //return json web token
            inpatient.count += 1
            await inpatient.save()
            const payload={
                user:{
                    id:inpatient.id
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

router.get('/',async(req,res)=>{
    try {
        const inpatient=await Inpatient.find();
        res.json(inpatient);
    } catch (err) {
        console.log(err.message);
    }
})

module.exports=router;