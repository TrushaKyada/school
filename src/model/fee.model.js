const mongoose = require("mongoose")
const  feeSchema = mongoose.Schema({
    SID:{
        type:String,
        required:true
    },
    Fees:{
        type:Number,
        required:true
    },
    AdminName:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Installment:{
        type:String,
        required:true
    }
}, {versionKey: false},{
    collection: "fee"
})

module.exports = mongoose.model("fee",feeSchema)