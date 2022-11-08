const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const BillSchema=mongoose.Schema({
    patient:{
        type:Schema.Types.ObjectId
    },
    cost:{
        type:String,
    },
    status:{
        type:Boolean
    }
})

module.exports=Bill=mongoose.model('bill',BillSchema);