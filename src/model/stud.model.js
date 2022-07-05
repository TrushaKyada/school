const mongoose  = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const studentSchema=mongoose.Schema({
    id:{
        type:String,
        require:true
    },
    Rollno:{
        type:Number,
        require:true
    },
    Class:{
        type:String,
        require:true
    },
    FullName:{
        type:String,
        require:true
    },
    fatherName:{
        type:String,
        require:true
    },
    motherName:{
       type:String,
       require:true 
    },
    F_occupation:{
        type:String
    },
    M_occupation:{
        type:String
    },
    email:{
        type:String,
        require:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email id")
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    fee:{
        type:Number,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
},{versionKey: false},{
    collection:"user"
})

studentSchema.methods.generateauthtoken = async function () {
    try {
        const t = jwt.sign({ _id: this._id.toString() }, "mynameistrushakyadatrusha")
        this.tokens = this.tokens.concat({ token: t })
        await this.save();
        return t;
    }
    catch (err) { 
        res.send(err)
    }
}
module.exports = mongoose.model("user",studentSchema)
