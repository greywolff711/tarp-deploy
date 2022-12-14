const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const AppointmentSchema=mongoose.Schema({
    date:{
        type: Date,
        required: true,
    },
    timing:{
        type:String
    },
    symptoms:{
        type:String,
    },
    patient:{
        type:Schema.Types.ObjectId
    },
    doctor:{
        type:Schema.Types.ObjectId
    },
    paid:{
        type:Boolean
    }
})

module.exports=Appointment=mongoose.model('appointment',AppointmentSchema);