import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";

// @desc Register user
// @route POST /api/users/
// @access Public

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

    } catch(error){

    }
});

export { registerUser };

