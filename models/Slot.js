const mongoose=require('mongoose');
const { Schema } = mongoose;

const slot = Schema({
    timing:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    slottimeid:{
        type: Number,
        required: true
    }
})

const Slot = mongoose.model("Slot", slot);

module.exports = Slot;
