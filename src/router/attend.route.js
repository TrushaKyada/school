const mongoose = require("mongoose");
const route = require("express").Router();

const {
    insertAttendance,
    updateAttendance,
    viewAttendance,
    viewById
} = require("../controller/attend.ctrl")

route.post("/insert",insertAttendance);
route.put("/edit/:id",updateAttendance);
route.get("/view",viewAttendance);
route.get("/viewById/:id",viewById);
module.exports = route;
