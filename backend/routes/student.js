const express = require('express')
const  router = express()
const port = 3000
const {Marks,Student}=require("../db/index")


 router.use(express.json());

    router.get("/allcourse/DBMS",async (req,res)=>{
        res.json({
        id:1,
        courseName:"DBMS",
        courseSite:"https://myherupa.com/pages/subjects/second-year/cse/dbms.html",
        Credits:"4.5",
      
    })
})
 router.get("/allcourse/CN",(req,res)=>{
    res.json({
        id:2,
        courseName:"CN",
        courseSite:"https://myherupa.com/pages/subjects/second-year/cse/networks.html",
        Credits:"4.0",
        
        // pdf ka link converter

    })
})

 router.get("/allcourse/SE",(req,res)=>{
    res.json({
        id:3,
        courseName:"SOFTWARE ENGINEERING",
        courseSite:"https://myherupa.com/pages/subjects/third-year/cse/softeng.html",
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

router.post('/getTimeTable', async (req, res) => {
    try {
        const { subgroup } = req.body;
        const finding = await Student.findOne({ subgroup });
        if (finding === null) {
            res.json({
                msg: "Subgroup's timetable not uploaded, kindly contact your teacher"
            });
        } else {
            res.json({
                subgroup: finding,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports= router

