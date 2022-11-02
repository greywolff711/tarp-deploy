const mongoose = require("mongoose")
const {Schema} = mongoose;

const room = Schema({
    roomNo: {
        type: Number,
        required: true
    },
    block: {
        type: String,
        required: true,
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    booked:{
        type:Boolean,
        required: true,
        default: false
    }
})

const Room = mongoose.model('Room',room);

module.exports = Room