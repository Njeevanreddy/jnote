const jwt=require('jsonwebtoken');

const JWT_SCERET = "JeevanKa$Sceret";
const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send("please authenticate using valid token")
    }
    try{
        const data = jwt.verify(token,JWT_SCERET)
        req.user = data.user;
        next();
    }catch(err){
        res.status(401).send("please authenticate using valid token")
    }
}

module.exports=fetchuser;