import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { verifyMail } from "../emailVerify/verifyMail.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "1d" })
        verifyMail(token, email)
        newUser.token = token
        await newUser.save()
         return res.status(201).json({
             success: true,
             message: "User registered successfully",
             data: newUser
         })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access"
            });
        }

        // Check if password matches
        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            return res.status(402).json({
                success: false,
                message: "Incorrect Password"
            });
        }

        // Check if user is verified
        if (user.isVerified !== true) {
            return res.status(403).json({
                success: false,
                message: "Verify your account then login!"
            });
        }

        // Generate tokens
        const accessToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "10d" }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "30d" }
        );

        // Update user login status
        user.isLoggedIn = true;
        await user.save();

        // Send success response
        return res.status(200).json({
            success: true,
            message: "User Logged in Successfully",
            accessToken,
            refreshToken,
            data: user
        });


    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};