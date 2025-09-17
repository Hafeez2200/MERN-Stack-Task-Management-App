
const jwt = require('jsonwebtoken');
const User = require('../models/user')


const authMiddleware = async (req,res,next)=>{
    const  token = req.cookies.taskUserToken;

    try {
        if(!token){
            return res.status(400).json({error:"new User"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(404).json({error: "User not found"})
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(400).json({error:"invalid token"})
    }
}

module.exports = authMiddleware;