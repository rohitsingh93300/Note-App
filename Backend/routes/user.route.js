import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { verification } from "../middleware/registrationTokenVerify.js";

const router = express.Router();

router.post("/register", registerUser);

// Route to verify user's email using JWT from email link
router.get("/verify-email", verification);
router.post("/login", loginUser);

export default router;