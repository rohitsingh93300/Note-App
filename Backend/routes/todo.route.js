import express from "express";
import { addTodo } from "../controllers/todo.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/create", isAuthenticated, addTodo);

export default router;