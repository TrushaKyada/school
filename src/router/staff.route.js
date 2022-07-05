const mongoose = require("mongoose");
const route = require("express").Router();
const staff = require("../middleware/auth");

const {
    insertStaff,
    updatestaff,
    deleteStaff,
    staffData,
    staffDataById
} = require("../controller/staff.ctrl")
route.post("/ragister", insertStaff)
route.put("/edit/:id", updatestaff)
route.delete("/delete/:id", deleteStaff)
route.get("/view", staffData)
route.get("/viewById/:id", staffDataById)
module.exports = route