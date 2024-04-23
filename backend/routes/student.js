const express = require('express')
const  router = express()
const port = 3000
const {Marks}=require("../db/index")
const cors=require('cors')

 router.use(express.json());
    router.use(cors)

    router.get("/allcourses/DBMS",(req,res)=>{
    res.json({
        id:1,
        courseName:"DBMS",
        courseSite:"www.google.com",
        Credits:"4.5",
      
    })
})
 router.get("/allcourses/CN",(req,res)=>{
    res.json({
        id:2,
        courseName:"CN",
        courseSite:"www.google.com",
        Credits:"4.0",
        // pdf ka link converter

    })
})

 router.get("/allcourses/SE",(req,res)=>{
    res.json({
        id:3,
        courseName:"SOFTWARE ENGINEERING",
        courseSite:"www.google.com",
        Credits:"4.0",
    })
})

 router.get("/getMark",async(req,res)=>{
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

module.exports= router

