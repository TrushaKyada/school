const mongoose = require("mongoose");
const attendSchema = mongoose.Schema({
    SID: {
        type: String,
        require: true
    },
    Rollno: {
        type: Number,
        require: true
    },
    Class: {
        type: String,
        require: true
    },
    Attendance: [
        {
            date: {
                type: String,
                require: true
            },
            presant: {
                type: Number,
                require: true
            }

        }
    ]

},{ versionKey: false },{
    collection: "attendance"
})

module.exports = mongoose.model("attendance", attendSchema);