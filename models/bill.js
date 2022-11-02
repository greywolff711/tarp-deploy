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
    }
})

module.exports=Bill=mongoose.model('bill',BillSchema);