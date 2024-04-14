const multer = require('multer');
const path = require("path");
const { Admin,Student } = require("../db/index.js");
const express = require('express');
const app = express();
const port = 3000;

// to upload TimeTable
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads')); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const upload = multer({ storage: storage });


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


app.post("/uploadTimeTable", upload.single('avatar'), (req, res) => {
    const imagePath = req.file.path; 
    Admin.create({
        avatar: imagePath 
    })
    .then(() => {
        res.json({ msg: "File uploaded successfully" });
    });
});

app.post("/addStudent",async(req,res)=>{
    let username=req.body.username
    let password=req.body.password
    let rollnumber=req.body.rollnumber
    let subgroup=req.body.subgroup
    await Student.create({
        username,
        password,
        rollnumber,
        subgroup
    })
    res.json({
        msg:"Student created successfully"
    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = upload;
