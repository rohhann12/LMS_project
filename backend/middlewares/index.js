const {Admin,Parent,Student}=require("../../db/index")



function adminMiddleWare(req,res,next){
    const username=req.headers.username;
    const password=req.headers.password;
    if(username=='admin' && password=='admin'){
        res.json({
            msg:"Logged in Successfully"
        })
        next();
    }else{
        res.json({
            msg:"Incorrect credentials"
        })
    }
}

function studentMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    Student.findOne({
        username,
        password
    })
    .then(function(Val) {
        if (Val) {
            next();
            res.json({
                msg: "Logged In Successfully"
            });
            next();
        } 
        
        else {
            res.status(401).json({
                msg: "Unauthorized"
            });
        }
    })

}
function parentMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    Parent.findOne({
        username,
        password
    })
    .then(function(Val) {
        if (Val) {
            next();
            res.json({
                msg: "Logged In Successfully"
            });
            next();
        } else {
            res.status(401).json({
                msg: "Unauthorized"
            });
        }
    })

}

module.exports={
    parentMiddleware,
    studentMiddleware,
    adminMiddleWare
}

