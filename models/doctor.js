const mongoose=require('mongoose');

const DoctorSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
    },
    phone:{
        type:Number,
    },
    address:{
        type:String,
    }
    //@todo add appointments and prescriptions ids
})

module.exports=Doctor=mongoose.model('doctor',DoctorSchema);