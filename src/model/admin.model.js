const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const adminSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email id")
            }
        }
    },
    password: {
        type: String,
        require: true
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
}, { versionKey: false },{
    collection: "admin"
})

adminSchema.methods.generateauthtoken = async function () {
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

adminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const passwordHash = await bcrypt.hash(this.password, 10)
    }
    next()
})

module.exports = mongoose.model("admin", adminSchema)