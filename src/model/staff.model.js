const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const staffSchema = mongoose.Schema({
    Name: {
        require: true,
        type: String
    },
    Number: {
        require: true,
        type: Number
    },
    Email: {
        require: true,
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email id")
            }
        }
    },
    Degree: {
        require: true,
        type: String
    },
    Subject: {
        require: true,
        type: String
    },
    Experience: {
        type: String
    },
    Salary: {
        type: Number,
        require: true
    },
    Fresher: {
        type: Number,
        require: true
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
},{versionKey: false},{
    collection: "staff"
})

staffSchema.methods.generateauthtoken = async function () {
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


module.exports = mongoose.model("staff", staffSchema)
