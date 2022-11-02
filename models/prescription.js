const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const PrescriptionSchema=mongoose.Schema({
    doctor: {
        type: Schema.Types.ObjectId,
    },
    patient: {
        type: String,
    },
    medicine: {
        type: String,
    },
    instructions: {
        type: String,
    },
})

module.exports=Precription=mongoose.model('prescription',PrescriptionSchema);