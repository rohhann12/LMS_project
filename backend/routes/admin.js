    const multer = require('multer');
    const path = require("path");
    const { Admin,Student,Marks,Image } = require("../db/index.js");
    const express = require('express');
    const router = express.Router()
    const port = 3000;
    const fs=require('fs')

        router.use(express.json());
        
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
        
    router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    router.post("/uploadTimeTable", upload.single('avatar'), (req, res) => {
        const imagePath = req.file.path; 
        const subgroup = req.body.subgroup;

        Student.create({
            avatar: imagePath,
            subgroup: subgroup,
            fileName: req.file.filename 
        })
        .then(async () => {

            try {
                const subgroup = req.body.subgroup;
                const fileData = fs.readFileSync(imagePath);
                const base64String = fileData.toString('base64');
                Image.create({
                    myFile:base64String,
                    subgroup:subgroup
                })
                res.json({ msg: "File uploaded successfully",subgroup:subgroup ,base64String: base64String});
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: "Error reading file" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Error uploading file" });
        });
    });

        router.post("/addStudent",async(req,res)=>{
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
    
        router.post("/addMarks", async (req, res) => {
            const rollnumber=req.body.rollnumber
            const check= await Student.findOne({
                rollnumber : rollnumber
            })

            if(!check){
                res.json({
                    msg:"user doesn't exist"
                })
            }else{
                const {total,DBMS,SE,CN,rollnumber}=req.body;
                await Marks.create({
                    rollnumber,
                    totalMarks:total,
                    DBMS,
                    SE,
                    CN
                })
                res.json({
                    msg: `Marks added successfully for roll number ${rollnumber}`
                });     
            }
        
        })


    module.exports= router