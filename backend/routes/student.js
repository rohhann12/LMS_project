const express = require('express')
const app = express()
const port = 3000
const {Marks,Student}=require("../db/index")
const cors=require('cors')
app.use(express.json());
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
    const rollnumber=req.body.rollnumber;
    const marksToShow= await Marks.findOne({rollnumber})
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
app.get('/tt', (req, res) => {
    try{
        Post.find({}).then(data => {
            res.json(data)
        }).catch(error => {
            res.status(408).json({ error })
        })
    }catch(error){
        res.json({error})
    }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
