const mongoose=require('mongoose');

const ReceptionistSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    phone:{
        type:String
    },
    address:{
        type:String
    }
});

let Receptionist = mongoose.model('Receptionist', ReceptionistSchema);
module.exports= Receptionist