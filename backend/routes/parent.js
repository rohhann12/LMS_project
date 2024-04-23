const {Marks}=require("../db/index")
const express = require('express')
const  router = express()
const port = 3000


 router.use(express.json());

 router.get("/getMarks",async(req,res)=>{
    const enterRollNum=req.body.enterRollNum;
    const marksToShow= await Marks.findOne({enterRollNum})
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