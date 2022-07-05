const mongoose = require("mongoose");
const admin = require("../middleware/auth")
const route = require("express").Router();
const {
    adminLogin,
    insertrecord,
    adminLogout
} = require("../controller/admin.ctrl")
route.post("/login", adminLogin)
route.get("/logout", admin, adminLogout)
route.post("/", insertrecord)
module.exports = route