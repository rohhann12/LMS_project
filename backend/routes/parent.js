const {Marks}=require("../db/index")
const express = require('express')
const  router = express()


 router.use(express.json());

 router.post("/getMarks",async(req,res)=>{
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