const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MedicalRecordSchema=mongoose.Schema({
    patient:{
        type:Schema.Types.ObjectId
    },
    consultation:{
        type:Boolean
    },
    tests:{
        type:String
    },
    xray:{
        type:String
    },
    extra:{
        type:Number
    }
})

module.exports=MedicalRecord=mongoose.model('medicalRecord',MedicalRecordSchema);