const admin = require("../model/admin.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
exports.adminLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const data = await admin.findOne({ email: email })
        console.log("data",data);
        if (data) {
            if (password === data.password) {
                const token = await data.generateauthtoken();
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 30 * 24 * 3600 * 10000),
                    httpOnly: true
                })
                if (bcrypt.compare(password, data.password)) {
                    res.status(201).json({
                        token: token,
                        message: "login successfully",
                        status: 201
                    })
                }
                else {
                    res.status(500).json({
                        message: "invalid detail..!!!",
                        status: 500
                    })
                }

            }
        }
        else {
            res.status(404).json({
                message: "data not exist.....",
                status: 500
            })
        }
    } catch (error) {
        console.log("error",error);
        res.status(500).json({
            message: "something went wrong",
            status: 500
        })
    }

}

exports.insertrecord = async (req, res) => {
    try {
        const data = new admin(
            {
                email: "admin@gmail.com",
                password: "admin123"
            })
        const adminData = await data.save()
        res.json({
            message: "successfully....!!!",
            status: 201,
            data: adminData
        })
    }
    catch (error) {
        res.json({
            message: "something went wrong",
            status: 500,
            error: error
        })
    }

}

exports.adminLogout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((curElement) => {
            return curElement.token !== req.token
        });
        res.clearCookie("jwt");
        await req.user.save();
        res.status(201).json({
            message: "logout Successfully...!!!",
            status: 201
        })
    } catch (error) {
        res.status(401).json({
            message: "please try again....!!!",
            status: 401
        })
    }
}