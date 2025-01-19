const jwt = require("jsonwebtoken")

const auth = (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(404).json({message: "Access  denied , no Token  provided. "})
    }
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;

        next();
    } catch (error) {
        res.status(500).json({message: "Error occured ! "})
    }
}

const adminAuthorized = (req, res, next) =>{
    auth( req, res, ()=>{
        if(req.user.role === "admin")
        {
            return next()
        }
        res.status(403).json({message: "Access denied, admin only"})
    })
}


module.exports = {
    auth, 
    adminAuthorized
}