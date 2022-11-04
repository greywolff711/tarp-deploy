const mongoose=require('mongoose');

const BillSchema=mongoose.Schema({
    name:{
        type:String
    },
    cost:{
        type:String,
    },
    status:{
        type:Boolean
    },
    tokens:{
        type:Number
        // default
    },
})

module.exports=Bill=mongoose.model('bill',BillSchema);