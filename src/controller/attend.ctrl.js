const attendance = require("../model/attend.model");

exports.insertAttendance = async (req, res) => {
    try {
        var a = new Date();
        var b = a.getDate() + "-" + a.getMonth() + "-" + a.getFullYear();
        const data = new attendance({
            SID: req.body.SID,
            Rollno: req.body.Rollno,
            Class: req.body.Class,
            Attendance: [{ 
                date: b,
                presant: req.body.presant 
            }]

        })
        const attendData = await data.save();
        res.status(200).json({
            message: `Attendance's record successfully inserted...!!!`,
            status: 200,
            data: attendData
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }
}

exports.updateAttendance = async (req, res) => {
    try {
        const data = await attendance.findOne({
            _id: req.params.id
        })
        if(data == null){
            res.status(404).json({
                "message": "user not found",
                "status" : 404
            })
        }
        else{
            const updateData = await attendance.findByIdAndUpdate({ _id: req.params.id }, {
                $set: {
                    SID: req.body.SID,
                    Rollno: req.body.Rollno,
                    Class: req.body.Class,
                    Attendance: [{ presant: req.body.presant }]
                }
            }, {
                new: true,
                useFindAndModify: false
            }).then(() => {
                res.status(200).json({
                    message: "Attendance record successfully updated...!!!",
                    status: 200
                })
            }).catch((error) => {
                res.status(400).json({
                    message: "something went wrong",
                    status: 400
                })
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "something went wrong",
            status: 400,
            error: error
        })
    }
}

exports.viewAttendance = async (req, res) => {
    try {
        const data = await attendance.find();
        res.status(200).json({
            message: "successfully....!!!",
            status: 200,
            data: data
        })
    } catch (error) {
        res.status(400).json({
            message: "something went wrong",
            status: 400
        })
    }

}

exports.viewById = async (req, res) => {
    try {
        const attendData = await attendance.findOne({
            _id: req.params.id
        })
        if(attendData == null){
            res.status(404).json({
                "message": "not found",
                "status" : 404
            })
        }else{
            res.status(200).json({
                "message": "successfully",
                "status" : 200,
                "data":attendData
            })
        }

    } catch (error) {
        res.status(400).json({
            message: "something went wrong",
            status: 400
        })
    }
}