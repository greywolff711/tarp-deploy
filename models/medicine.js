const mongoose=require('mongoose');

const MedicineSchema=mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    count:{
        type:Number
    }
})

module.exports=Medicine=mongoose.model('medicine',MedicineSchema);