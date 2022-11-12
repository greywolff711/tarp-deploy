const mongoose=require('mongoose');
const { Schema } = mongoose;

const AppointmentSlotSchema = Schema({
    date:{
        type: Date,
        required: true,
    },
    timing:[{
        type: String
    }]
})

const AppointmentSlot = mongoose.model("AppointmentSlot", AppointmentSlotSchema);

module.exports = AppointmentSlot;
