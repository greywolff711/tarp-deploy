const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const PharmacistSchema=mongoose.Schema({
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
    address:{
        type:String,
    },
    phone:{
        type:String,
    },
    prescription:{
        type:Schema.Types.ObjectId
    }
})

module.exports=Pharmacist=mongoose.model('pharmacist',PharmacistSchema);