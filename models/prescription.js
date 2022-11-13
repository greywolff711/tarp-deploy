const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const { ObjectId } = Schema.Types;

const PrescriptionSchema=mongoose.Schema({
    doctor: {
        type: ObjectId,
    },
    patient: {
        type: ObjectId,
    },
    image: {
        type: String
    },
    medicine: {
        type: String,
    },
    instructions: {
        type: String,
    },
})

module.exports=Precription=mongoose.model('prescription',PrescriptionSchema);