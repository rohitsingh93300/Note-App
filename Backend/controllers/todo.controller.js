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

        const todo = await Todo.findById(todoId)
        if (!todo) {
            return res.status(400).json({
                success: false,
                message: "Todo not found"
            })
        }
        // if(todo.userId !== userId){
        //     return res.status(400).json({
        //         success:false,
        //         message:"User unauthorized to delete todo"
        //     })
        // }
        await Todo.findByIdAndDelete(todoId)
        return res.status(200).json({
            success: false,
            message: "Todo deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const todoId = req.params.todoId;
        // const userId = req.userId;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const todo = await Todo.findOneAndUpdate(
            { _id: todoId}, 
            { title },
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
