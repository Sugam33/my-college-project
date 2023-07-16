import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";

//  user authenticate and get token ko lagi ho yesma chai jwt library use gareko
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

// protection ko middleware
const protect = asyncHandler(async(req, res, next) => {
    let token;
    // check if token exists in headers
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
      try{
        token = req.headers.authorization.split(" ")[1];
        // verify token and get user id 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // get user id from decoded token
        req.user = await User.findById(decoded.id).select("-password");
        next();
      }  catch(error){
        console.log(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
    // header ma token chaina vane error pathau
    if(!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

// admin middleware
const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next();
  }
  else{
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { generateToken, protect, admin };
