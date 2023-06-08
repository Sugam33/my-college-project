import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";

// @desc Authenticated user and get token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

// protection middleware
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
        req.user = await User.findbyId(decoded.id).select("-password");
        next();
      }  catch(error){
        console.log(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
    // if token doesnt exist in headers send error
    if(!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export { generateToken, protect };
