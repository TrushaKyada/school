const staff = require("../model/staff.model");
const stud = require("../model/stud.model")
const jwt = require("jsonwebtoken")
const { Model } = require("mongoose")

exports.insertStaff = async (req, res) => {
    try {
        const data = new staff({
            Name: req.body.Name,
            Number: req.body.Number,
            Email: req.body.Email,
            Degree: req.body.Degree,
            Subject: req.body.Subject,
            Experience: req.body.Experience,
            Salary: req.body.Salary,
            Fresher: req.body.Fresher
        })
        const staffData = await data.save()
        res.json({
            message: "successfully inserted....!!!",
            status: 201,
            data: staffData
        })
    } catch (error) {
        res.json({
            message: "something went wrong",
            status: 400,
            error: error
        })
    }
}

exports.updatestaff = async (req, res) => {
    try {
        const data = await staff.findOne({
            _id: req.params.id
        })


        console.log(data);

        if (data == null) {
            res.status(404).json({
                "message": "user not found",
                "status": 404
            })
        }
        const updateData = await staff.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                Name: req.body.Name,
                Number: req.body.Number,
                Degree: req.body.Degree,
                Subject: req.body.Subject,
                Experience: req.body.Experience,
                Salary: req.body.Salary,
                Fresher: req.body.Fresher
            }
        }, {
            new: true,
            useFindAndModify: false
        }).then(() => {

            res.status(200).json({
                message: "Staff's record successfully updated....!!!!",
                status: 200
            })
        }).catch((error) => {
            console.log("error", error);
            res.status(500).json({
                message: "Something went wrong...!!!",
                status: 500
            })

        })
    } catch (error) {
        res.status(500).json({
           message:"something went wrong",
           status:500
        })
    }
}

exports.deleteStaff = async (req, res) => {
    try {
        const data = await staff.findOne({
            _id: req.params.id
        })
        console.log("-----", data);

        if (data == null) {
            res.status(404).json({
                "message": "user not found",
                "status": 404
            })
        } else {
            const deleteData = await staff.findByIdAndDelete({ _id: req.params.id })
            console.log("deleted.....");
            res.status(201).json({
                message: `successfully deldeted`,
                status: 201
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            status: 500,
            error: error
        })
    }
}

exports.staffDataById = async (req, res) => {
    try {
        const a = await staff.findOne({
            _id: req.params.id
        })

        if (a == null) {
            res.status(404).json({
                "message": "user not found",
                "status": 404
            })
        } else {
            res.status(200).json({
                "message": "user get successfully",
                "status": 200,
                "data": a
            })
        }

    }
    catch (e) {
        res.json(
            {
                message: "something went wrong",
                error: e
            })
    }
}

exports.staffData = async (req, res, next) => {
    try {
        const resData = await staff.find()
        res.status(200).json(
            {
                messaage: "View All Data",
                status: 200,
                data: resData
            }
        )
    } catch (error) {
        console.log("error", error);
        res.json(
            {
                message: "something went wrong",
                error: error
            })
    }

}
