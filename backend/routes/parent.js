const {Marks}=require("../db/index")
const express = require('express')
const app = express()
const port = 3000

app.get("/getMarks/name",(req,res)=>{
    const marksToShow=Marks.findOne({})
    res.json({
        marksObtained:marksToShow
    })
})

module.exports={
    app
}