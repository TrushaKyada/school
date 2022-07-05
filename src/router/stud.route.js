const route = require("express").Router()
const multer = require("multer")
const user = require("../model/stud.model")
const auth = require("../middleware/auth")
const {stud_attend} = require("../controller/stud_Attendance.ctrl")
const {
    studRagister,
    login,
    studentDataById,
    updateStudData,
    deleteStudData,
    studentData,
    countStudent
} = require("../controller/stud.Ctrl")

route.post("/ragister", studRagister)
route.get("/login", login)
route.get("/view/", studentData)
route.get("/view/:id", studentDataById)
route.put("/view/edit/:id", updateStudData)
route.delete("/view/delete/:id", deleteStudData)
route.get("/countStud",countStudent)
route.get("/attendance",stud_attend)
module.exports = route





















