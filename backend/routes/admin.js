const multer = require('multer');
const path = require("path");
const { Admin,Student,Marks,Post } = require("../db/index.js");
const express = require('express');
const e = require('express');
const app = express();
const port = 3000;
const fs=require('fs')

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    // Set the filename of the uploaded file
    cb(null, file.originalname);
  }
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
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.post("/uploadTimeTable", upload.single('avatar'), async (req, res) => {
    try {
      const { originalname, buffer } = req.file;
      const imageData = {
        name: originalname,
        data: buffer.toString('base64') // Convert buffer to base64 string
      };
  
      const subgroup = req.headers.subgroup;
  
      await Student.create({
        avatar: imageData.data, // Store base64 data in the avatar field
        subgroup: subgroup,
        fileName: originalname
      });
  
      res.json({ msg: "File uploaded successfully" });
    } catch (error) {
      console.error(error);
    }
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
  
    app.post("/addMarks", async (req, res) => {
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


module.exports={
    upload
}
