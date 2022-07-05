const mongoose = require("mongoose");
const route = require("express").Router();

const{
    insertFees,
    updateFees,
    viewFeeDetail,
    viewByIdFeeDetail,
    viewBySIDFeeDetail,
    countFeeData
} = require("../controller/fees.ctrl");

route.post("/insert",insertFees);
route.put("/edit/:id",updateFees);
route.get("/viewAll",viewFeeDetail);
route.get("/viewById/:id",viewByIdFeeDetail);
route.get("/viewBySID/:id",viewBySIDFeeDetail);
route.get("/view/countFeeData",countFeeData)

module.exports = route