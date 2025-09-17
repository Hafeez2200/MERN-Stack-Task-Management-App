const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (username.length < 5) {
      return res.status(400).json({ error: "username must be 6 characters" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "password must be 6 characters" });
    }

    const checkUser = await User.findOne({ $or: [{ email }, { username }] });

    if (checkUser) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      const hashpass = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashpass });
      await newUser.save();
      return res.status(200).json({ success: "Registeration Successful" });
    }
  } catch (error) {
    return res.status(404).json({ error: "internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      bcrypt.compare(password, checkUser.password, (err, data) => {
        if (data) {
          const token =  jwt.sign(
            { id: checkUser._id, email: checkUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
          );
           res.cookie("taskUserToken",token,{
            httpOnly: true,
            maxAge: 30*24*60*60*1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
          })
          res.status(200).json({success: "Login Successfull"})
        }
        else{
            res.status(400).json({error: "Invalid Credentials"})
        }
      });
    }
    else {
      res.status(400).json({error: "User not found"})
    }
  } catch (error) {
    res.status(404).json({error: "internal server Error"})
  }
};

const logout = async (req,res)=>{
  try {
    res.clearCookie("taskUserToken",{
      httpOnly:true,
    })
    res.json({message: "Logged out"})
  } catch (error) {
    res.status(404).json({message:"internal server error"})
  }
}

const userDetails = async (req,res) => {
  try {

    const {user} = req;
    const getDetails = await User.findById(user._id).populate("tasks").select("-password");
    if(getDetails){
      const allTasks = getDetails.tasks;
      let yetToStart= []
      let inProgress= []
      let completed= []

      allTasks.map((item)=>{
        if(item.status === "yetToStart") {
          yetToStart.push(item);
        }
         else if(item.status === "inProgress") {
          inProgress.push(item);
        }
        else{
          completed.push(item);
        }
      })
      return res.status(200).json({
        success: "Success",
        tasks: {yetToStart,inProgress,completed}
      })
    }
    
  } catch (error) {
    res.status(404).json({message:"internal server error"})
  }
}

module.exports = { register,login,logout,userDetails };
