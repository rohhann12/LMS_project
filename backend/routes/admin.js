const multer = require('multer');
const path = require("path");
const { Admin,Student,Marks } = require("../db/index.js");
const express = require('express');
const e = require('express');
const app = express();
const port = 3000;

// to upload TimeTable
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function(req, file, cb) {
        let extName = path.extname(file.originalname);
        cb(null, Date.now() + extName);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if (file.mimetype === "image/png") {
            callback(null, true);
        } else {
            console.log("Please upload an image in PNG format.");
            callback(null, false);
        }
    },
});

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.post("/uploadTimeTable", upload.single('avatar'), (req, res) => {
    const imagePath = req.file.path; 
    const subgroup = req.headers.subgroup;

    Student.create({
        avatar: imagePath,
        subgroup: subgroup,
        fileName: req.file.filename // Assuming req.file.filename gives the uploaded file name
    })
    .then(() => {
        res.json({ msg: "File uploaded successfully" });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "Error uploading file" });
    });
});


    app.post("/addStudent",async(req,res)=>{
        const { username, password, rollnumber,subgroup } = req.body;
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
    // ismei kuch issue hai
    app.post("/addMarks", async (req, res) => {
        try {
            const rollNumber = parseInt(req.body['rollNumber']); // Convert to number
    
            console.log('Received Roll Number:', rollNumber);
    
            if (!rollNumber) {
                return res.status(400).json({ error: 'Roll number not provided in request body' });
            }
    
            const student = await Student.findOne({ rollNumber });
    
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
    
            const { DBMS, CN, SE, totalMarks } = req.body;
    
            const marks = await Marks.create({
                rollNumber, // Include the rollNumber from request body
                totalMarks,
                DBMS,
                SE,
                CN
            });
    
            res.json({
                msg: `Marks added to/updated for the student ${rollNumber}`,
                marks // Optionally, you can send back the created/updated marks data
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    
    

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = upload;
