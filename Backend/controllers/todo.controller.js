import { Todo } from "../models/todo.model.js"

export const addTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.userId

        const existing = await Todo.findOne({
            //   title: { $regex: title, $options: "i" }, //case insensitive
            title: title,
            userId: userId,
        });
        // console.log("userid...", req.userId);

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Title already exists",
            });
        }
        const data = await Todo.create({
            title,
            userId: userId, // for which user we are creating note
        });
        if (data) {
            return res.status(200).json({
                success: true,
                message: "todo created successfully",
                data: data,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};