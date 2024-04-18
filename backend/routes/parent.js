const {Marks}=require("../db/index")
const express = require('express')
const app = express()
const port = 3000


app.use(express.json());

app.get("/getMarks",async(req,res)=>{
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


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
