import express from "express";
import { addTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todo.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { todoSchema, validateTodo } from "../validators/todoValidate.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/create", isAuthenticated, upload.single('image'), validateTodo(todoSchema), addTodo);
router.get("/get", isAuthenticated, getTodo)
router.delete("/delete/:todoId", isAuthenticated, deleteTodo)
router.put("/update/:todoId", isAuthenticated, updateTodo)

export default router;