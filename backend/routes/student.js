const express = require('express')
const  router = express()
const port = 3000
const {Marks,Student,PDF,TT}=require("../db/index")


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
router.post("/getTimeTable", (req, res) => {
    const subgroup=req.body.subgroup
    try {
      TT.find({subgroup}).then((data) => {
        res.send({ status: "ok", data: data });
      });
    } catch (error) {
        console.log(error)
    }
  });
  
router.get('/getAssignments',(req,res)=>{
    // const CourseName=req.body.CourseName
    try {
        PDF.find({}).then((data)=>{
            res.send({
                status:"ok",
                data:data
            })
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports= router

