    const multer = require('multer');
    const path = require("path");
    const { Student,Marks,Image } = require("../db/index.js");
    const express = require('express');
    const router = express.Router()
    const port = 3000;
    const fs=require('fs')

        router.use(express.json());
 
    router.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    router.post("/uploadTimeTable",  async (req, res) => {
        try {
          const { base64String, subgroup } = req.body;
      
          if (!base64String || !subgroup) {
            return res.status(400).json({ error: 'Missing data in request body' });
          }
      
          await Student.create({ avatar: base64String, subgroup: subgroup });
          res.json({ msg: 'File uploaded successfully', subgroup: subgroup });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
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


    module.exports= router