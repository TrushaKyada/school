const express = require("express");
const app = express();
var cors = require('cors');

app.use(cors());


const conn = require("../src/db/conn");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const studRouter = require("./router/stud.route");
const adminRouter = require("./router/admin.route");
const staffRouter = require("./router/staff.route");
const feeRouter = require("./router/fees.route");
const attendRouter = require("./router/attend.route");

const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");

const port = process.env.PORT || 8070;

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/stud", studRouter);
app.use("/admin",adminRouter);
app.use("/staff",staffRouter);
app.use("/fees",feeRouter);
app.use("/attendance",attendRouter);

app.listen(port, () => {
    console.log(`server is connected  at ${port}`);

})