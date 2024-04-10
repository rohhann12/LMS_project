const express = require('express')
const app = express()
const port = 3000
const {Marks}=require("backend/db/index.js")

  
app.get("/allcourses/DBMS",(req,res)=>{
    res.json({
        id:1,
        courseName:"DBMS",
        courseSite:"www.google.com",
        Credits:"4.5",
        // i have to learn how to pass in links
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

app.get("/getMarks/name",(req,res)=>{
    Marks.findOne({
        // i have to check for the name of the student to render its marks
    })
})

app.get("/timetable",(req,res)=>{
//  yeh hum get krenge jb admin bhejdega udhr se 
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})