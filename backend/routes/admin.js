    const path = require("path");
    const { Student,Marks,PDF,TT } = require("../db/index.js");
    const express = require('express');
    const router = express.Router()
    const multer = require('multer');

    router.use(express.json());
    const fs = require('fs');

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../files'));
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
      },
    });
    
    const upload = multer({ storage: storage });
    
    router.use('/files', express.static(path.join(__dirname, '../files')));
    
    router.post("/upload-files", upload.single("file"), async (req, res) => {
      console.log(req.file);
    
      const CourseName = req.body.CourseName;
      const filePath = req.file.path; // Path to the uploaded file on disk
    
      try {
        const fileData = fs.readFileSync(filePath, { encoding: 'base64' });
        
        await PDF.create({  
            CourseName:CourseName,
            fileData: fileData });
        
      
        res.send({ status: fileData});
        console.log(fileData)
      } catch (error) {
        res.json({ status: error });
      }
    });

    router.post("/uploadTimeTable", upload.single("image"), async (req, res) => {
        console.log(req.file);
      
        const subgroup = req.body.subgroup;
        const filePath = req.file.path; 
      
        try {
          const fileData2 = fs.readFileSync(filePath, { encoding: 'base64' });
          await TT.create({ subgroup: subgroup, fileData2: fileData2 });
          res.send({ status: 'ok', fileData2: fileData2 });
          console.log('File uploaded and saved to MongoDB:', fileData2);
        } catch (error) {
          console.error('Error uploading file:', error);
          res.status(500).json({ status: 'error', message: 'Failed to upload file' });
        }
      });



        router.post("/addStudent",async (req,res)=>{
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
            try {
                const rollnumber = req.body.rollnumber;
                const { DBMS, SE, CN } = req.body;
        
                // Validate input (example using basic checks)
                if (!rollnumber || !DBMS || !SE || !CN) {
                    return res.status(400).json({ msg: "Missing required fields" });
                }
                if (typeof DBMS !== 'number' || typeof SE !== 'number' || typeof CN !== 'number') {
                    return res.status(400).json({ msg: "Marks should be numbers" });
                }
        
                const check = await Student.findOne({ rollnumber });
                if (!check) {
                    return res.status(404).json({ msg: "user doesn't exist" }); 
                }
        
                await Marks.create({
                    rollnumber,
                    DBMS,
                    SE,
                    CN
                });
        
                res.json({
                    msg: `Marks added successfully for roll number ${rollnumber}`
                }); 
            } catch (error) {
                console.error(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
        router.post('/deleteUser',async (req,res)=>{
            try {
                const rollnumber=req.body.rollnumber
                const deleteEntry = await Student.deleteOne({rollnumber})
                res.json({
                    msg:`User deleted with rollnumber ${rollnumber}`
                })
            } catch (error) {
                console.log(error)
            }
        })

    module.exports= router