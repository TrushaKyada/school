const express = require("express");
const fees = require("../model/fee.model");

exports.insertFees = async(req,res)=>{
    try {
        const a = Math.floor((Math.random() * 100000) + 1)
        const data = new fees({
            SID : req.body.SID,
            Fees:req.body.Fees,
            AdminName:req.body.AdminName,
            Date:req.body.Date,
            Installment:req.body.Installment
        })
        const feeData = await data.save();
        res.status(200).json({
            message:"record inserted successfully...!!",
            status:200,
            data:data
        })
    } catch (error) {
            res.status(400).json({
                message:"something went wrong",
                status:400
            })
    }
}

exports.updateFees = async(req,res)=>{
    try {
        const data = await fees.findOne({
            _id: req.params.id
        })

        if(data == null){
            res.status(404).json({
                "message": "user not found",
                "status" : 404
            })
        }
        else{
            const updateData = await fees.findByIdAndUpdate({_id:req.params.id},{
                $set:{
                   
                    Fees:req.body.Fees,
                    AdminName:req.body.AdminName,
                    Date:req.body.Date,
                    Installment:req.body.Installment
                }
            },{
                new:true,
                useFindAndModify:false
    
            }).then(()=>{
                res.status(200).json({
                    message:"fees's record updated successfully",
                    status:201
                })
            }).catch((error)=>{
                res.status(500).json({
                    message:"something went wrong",
                    status:500
                })
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"something went wrong",
            status:500,
            error:error
        })
    }
}

exports.viewFeeDetail = async(req,res)=>{
    try {
        const data = await fees.find();
        res.status(201).json({
            message:"successfully...!!",
            data:data
        })
    } catch (error) {
        res.status(500).json({
            message:"something went wrong....!!!",
            error:error
        })
    }
}

exports.viewByIdFeeDetail = async(req,res)=>{
    try {
        
        const feedata = await fees.findOne({
            _id: req.params.id
        })
        if(feedata == null){
            res.status(404).json({
                "message": "user not found",
                "status" : 404
            })
        }else{
            res.status(200).json({
                "message": "user get successfully",
                "status" : 200,
                "data":feedata
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"something went wrong....!!!",
            error:error
        })
    }
}

exports.viewBySIDFeeDetail = async(req,res)=>{
    try {
        
        const feedata = await fees.findOne({
            SID: req.params.id
        })


        console.log(feedata);

        if(feedata == null){
            res.status(404).json({
                "message": "user not found",
                "status" : 404
            })
        }else{
            res.status(200).json({
                "message": "user get successfully",
                "status" : 200,
                "data" : feedata
            })
        }
         
    } catch (error) {
        res.status(500).json({
            message:"something went wrong....!!!",
            error:error
        })
    }
}

exports.countFeeData = async(req,res)=>{
    try {
        const data = await fees.find().count();
        res.status(201).json({
            message:"successfully...!!",
            data:data
        })
    } catch (error) {
        res.status(500).json({
            message:"something went wrong....!!!",
            error:error
        })
    }
}
