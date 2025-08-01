import { Todo } from "../models/todo.model.js"

export const addTodo = async (req, res) => {
    try {
        const { title, description } = req.body;      
        const userId = req.userId
        const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;

        const existing = await Todo.findOne({
            //   title: { $regex: title, $options: "i" }, //case insensitive
            title: title,
            description:description,
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
            description,
            userId: userId, // for which user we are creating note
            image:imageUrl
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

export const getTodo = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User id is required'
            })
        }
        const todos = await Todo.find({ userId })
        if (!todos) {
            return res.status(404).json({ message: "No todo found", todos: [], success: false })
        }
        return res.status(200).json({ todos, success: true })
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching todos",
            error: error.message
        })
    }


}

export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const userId = req.userId;

        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        // Ensure the todo belongs to the logged-in user
        if (todo.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "User unauthorized to delete this todo"
            });
        }

        await Todo.findByIdAndDelete(todoId);

        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const updateTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const todoId = req.params.todoId;
        // const userId = req.userId;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const todo = await Todo.findOneAndUpdate(
            { _id: todoId}, 
            { title, description },
            { new: true } 
        );

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found or unauthorized"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            todo,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
