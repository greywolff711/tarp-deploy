const mongoose = require("mongoose")
const {Schema} = mongoose;
const {ObjectId} = Schema.Types;

const query = Schema({
    patient: {
        type: String,
        ref: 'Patient',
        required: true
    },
    query: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: false,
    }
})

const Query = mongoose.model('Query',query);

module.exports =  Query
