import { generateToken } from "../lib/utils.js";
import User from "../model/User.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"

// Signup a new user
export const signup = async (req, res) => {
    const {FullName, email, password, bio} = req.body;

    try {
        if (!FullName || !email || !password || !bio) {
            return res.json({success: false, message: "Missing Details"})
        }
        const user = await User.findOne({Email: email});
        if (user) {
            return res.json({success: false, message: "Account already exists"})
        }
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
           FullName, Email: email, Password: hashPassword, bio 
        })

        const token = generateToken(newUser._id)

        res.json({success: true, userData: newUser, token, message: "Account created successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Controller to login - a user can login
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({Email: email})

        if (!user) {
            return res.json({success: false, message: "Invalid credentials"});
        }

        const correctPassword = await bcrypt.compare(password, user.Password)

        if (!correctPassword) {
            return res.json({success: false, message: "Invalid credentials"});
        }

        const token = generateToken(user._id)

        res.json({success: true, userData: user, token, message: "Login successful"})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// controller to check if user is authenticated
export const checkAuth = (req, res) => {
    res.json({success: true, user: req.user});
}

// Controller to update user profile details
export const updateProfile = async (req, res) => {
    try {
        const {profilePic, bio, FullName} = req.body;

        const userId = req.user._id;
        let updatedUser;

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, {bio, FullName}, {new: true})
        }else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {profilePic:  upload.secure_url, bio, FullName}, {new: true});
        }
        res.json({success: true, user: updatedUser})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

