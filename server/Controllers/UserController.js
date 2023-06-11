import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";

//  Register user
const registerUser = asyncHandler(async (req, res) => {
    const {fullName, email, password, image} = req.body
    try{
        const userExists = await User.findOne({email})
        // check if user exists
        if(userExists){
            res.status(400)
            throw new Error("User already exists");
        }

        // hash password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

        // create user in DB
        const user = await User.create({
            fullName,
            email,
           password: hashedPassword,
            image,
        });

        // if user created successfully, send user data and token to client 
        if(user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }
        else{
            res.status(400);
            throw new Error("Invalid data of user");
        }

    } catch(error){
        res.status(400).json({
            message: error.message
        });
    }
});

// Login user
const loginUser = asyncHandler(async(req, res) => {
    const {email, password } = req.body;
    try{
        // find user in DB
        const user = await User.findOne({ email });
        // if user exists, then compare password with hashed password then send user data to client
         if(user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
            // if user not found or password not match then send error message
         }
         else{
            res.status(401);
            throw new Error("Invalid email or password");
         }
    } catch(error){
        res.status(400).json({message: error.message});
    }
});

// ********  PRIVATE CONTROLLERS *******

// Update User Profile
const updateUserProfile = asyncHandler(async(req, res) => {
    const { fullName, email, image } = req.body;
    try{
        // find user in DB
        const user = await User.findById(req.user._id);
        // if user exists update user data and save it in DB
        if (user){
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updatedUser = await user.save();

            // send updated user data and token to client 
            res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                image: updatedUser.image,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            });
        }
        else{
            res.status(404);
            throw new Error("User not found");
        }
    } catch(error){
        res.status(400).json({
            message: error.message
        });
    }
});
 
// Delete User profile
const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.user._id);
    // if user cha vane delete user database bata
    if (user) {
        // admin delete garna mildaina so throw error 
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Can't delete admin");
      }
      // natra user lai delete gardiney
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Change user password
const changeUserPassword = asyncHandler(async(req, res) => {
    const { oldPassword, newPassword } = req.body;
    try{
        // find user in DB
        const user = await User.findById(req.user._id);
        // user exist garcha vane user ko password update garney ani save garney database ma 
         if(user && (await bcrypt.compare(oldPassword, user.password))){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.json({message : "Password changed!!"});
         }
         else{
            res.status(401);
            throw new Error("Invalid Old Password");
         }
    } catch(error){
        res.status(400).json({message: error.message});
    }
});



export { registerUser, loginUser, updateUserProfile, deleteUserProfile, changeUserPassword };

