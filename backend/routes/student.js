const express = require('express')
const app = express()
const port = 3000
const {Marks,Student}=require("../db/index")

  
app.get("/allcourses/DBMS",(req,res)=>{
    res.json({
        id:1,
        courseName:"DBMS",
        courseSite:"www.google.com",
        Credits:"4.5",
        // i have to pass in links
    })
})
app.get("/allcourses/CN",(req,res)=>{
    res.json({
        id:2,
        courseName:"CN",
        courseSite:"www.google.com",
        Credits:"4.0",

    })
})

app.get("/allcourses/SE",(req,res)=>{
    res.json({
        id:3,
        courseName:"SOFTWARE ENGINEERING",
        courseSite:"www.google.com",
        Credits:"4.0",
    })
})

app.get("/getMarks",async(req,res)=>{
    const RollNum=req.headers.RollNum;
    const marksToShow= await Marks.findOne({RollNum})
    if(marksToShow==null){
        res.json({
            msg:"Marks not added"
        })
    }else{
        res.json({
            marksObtained:marksToShow
        })
    }
})
app.get("/timetable", async (req, res) => {
    const subgroup = req.query.subgroup; // Access query parameters using req.query

    try {
        const timetable = await Student.findOne({ subgroup: subgroup }).exec();
        if (!timetable) {
            return res.status(404).json({ error: "Timetable not found for this subgroup" });
        }
        // Send the file as a response
        res.sendFile(avatar);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
