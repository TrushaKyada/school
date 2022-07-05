const stud = require("../model/stud.model");
const attend = require("../model/attend.model");
const jwt = require("jsonwebtoken");
exports.stud_attend = async(req,res)=>{
    try {
        console.log("hello");
        const data = await stud.aggregate([{
            $lookup:{
                from:"attendance",
                localField:"SID",
                foreignField:"id",
                as:"attendance_info"  
            }
        }
        ]).then((respon) => {
            res.status(201).json({
                Message:"success...!!!",
                status:201,
                data:respon

            })
          })
        .catch((error) => {
            console.log("error:",error);
            res.status(500).json({
                Message:"something went wrong....!!!",
                status:500
            })
        });
    } catch (error) {
        res.status(500).json({
            Message:"something went wrong",
            status:500
        })
    }
}

