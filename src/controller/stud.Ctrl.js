const user = require("../model/stud.model");
const jwt = require("jsonwebtoken");

exports.studRagister = async (req, res) => {
    try {
        const a = Math.floor((Math.random() * 100000) + 1)

        const userData = new user(
            {
                id: `stud${a}`,
                Rollno:req.body.Rollno,
                Class:req.body.Class,
                FullName: req.body.name,
                fatherName: req.body.fatherName,
                motherName: req.body.motherName,
                F_occupation: req.body.F_occupation,
                M_occupation: req.body.M_occupation,
                email: req.body.email,
                phone: req.body.phone,
                fee: req.body.fee,
                address: req.body.address,
                city: req.body.city,
                gender: req.body.gender
            })
     
        const userDetail = await userData.save();
       
        res.status(201).json({
            message: "Student Successfully Registered",
            status: 201,
            insertedData: userDetail
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: 500,
            error: error
        })
    }
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const userOtp = req.body.otp;
    const otp = 9999;
    console.log(email)
    const userEmail = await user.findOne({ email: email })
    console.log("useremail", userEmail);
    if (email === userEmail.email) {
        if (userOtp === otp) {
            const token = await userEmail.generateauthtoken()
            console.log("token", token);
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30 * 24 * 3600 * 10000),
                httpOnly: true
            })
            res.status(201).json({
                token: token,
                message: "Student login successfully",
                status: 201
            })
        }
    }
    else {
        res.send("invalid details")
    }

}

exports.studentDataById = async (req, res) => {
    try {
        const data = await user.findOne({_id:req.params.id})


        console.log(data);

        if(data == null){
            res.status(404).json({
                "message": "user not found",
                "status" : 404
            })
        }else{
            res.status(200).json({
                "message": "user get successfully",
                "status" : 200,
                "data": data
            })
        }
      
        
        
    } catch (e) {
        res.status(400).json({
            "message": "something went wrong",
            "status" : 400
        })
    }
}

exports.studentData = async (req, res) => {
    try {
        const studentData = await user.find()
        res.send(studentData)
    } catch (e) {
        res.send(e)
    }
}

exports.updateStudData = async (req, res) => {
    try {
        const data = await user.findOne({
            _id: req.params.id
        })


        console.log(">>>>>>>",data);

        if(data == null){
            res.status(404).json({
                "message": "user not found",
                "status" : 404
            })
        }else{
            const updateData = await user.findByIdAndUpdate({ _id: req.params.id }, {
                $set: {
                    Rollno:req.body.Rollno,
                    Class:req.body.Class,
                    FullName: req.body.name,
                    fatherName: req.body.fatherName,
                    motherName: req.body.motherName,
                    F_occupation: req.body.F_occupation,
                    M_occupation: req.body.M_occupation,
                    phone: req.body.phone,
                    fee: req.body.fee,
                    address: req.body.address,
                    city: req.body.city,
                    gender: req.body.gender
                }
            },
                {
                    new: true,
                    useFindAndModify: false
                }).then(() => {
                    res.status(200).json({
                        message: "Student Profile Successfully Updated",
                        status: 200
                    })
                }).catch((e) => {
                    res.status(500).json({
                        message: "Something Went wrong",
                        status: 500
                    })
                })
        }
        
    }
    catch (err) {
        console.log("err:::::::",err);
        res.status(500).json({
            message: "Something Went wrong",
            status: 500
        })
    }
}

exports.deleteStudData = async (req, res) => {
    try {
        const data = await user.findOne({
            _id: req.params.id
        })


        console.log(data);

        if(data == null){
            res.status(404).json({
                "message": "user not found",
                "status" : 404
            })
        }
        else{
            await user.findByIdAndDelete({ _id: req.params.id });
            res.status(201).json({ message: `${req.params.id} Successfully deleted...!!!` });
        }

    }
    catch (e) {
        res.status(500).send(e);
    }
}

exports.countStudent = async (req, res) => {
    try {
        const studentData = await user.find().count();
        console.log("countData",studentData)
        res.status(200).json({
            message:"successfully...!!!!",
            status:200,
            countData:studentData
        })
    } catch (e) {
        res.send(e)
    }
}

