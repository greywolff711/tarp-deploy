const mongoose=require('mongoose');

const AdminSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    phone:{
        type:Number,
    },
})

module.exports=Admin=mongoose.model('admin',AdminSchema);