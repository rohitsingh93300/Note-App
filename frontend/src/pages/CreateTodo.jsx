import React, { useEffect, useState } from 'react'

const CreateTodo = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const dummyTodos = [
        { id: 1, title: "Learn React" },
        { id: 2, title: "Practice Tailwind CSS" },
        { id: 3, title: "Build Todo App" },
    ];

    const handleCreateTodo = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTodo = {
            id: Date.now(),
            title: title.trim(),
        };

        setTodos([newTodo, ...todos]);
        setTitle("");
    };

    useEffect(() => {
        setTodos(dummyTodos);
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-xl  rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold  mb-4 text-gray-800">
                    Notes
                </h2>

                <form onSubmit={handleCreateTodo} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 ring-blue-400"
                        placeholder="Enter your todo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Add
                    </button>
                </form>

                <ul className="space-y-3">
                    {todos.length === 0 ? (
                        <p className="text-center text-gray-500">No todos found.</p>
                    ) : (
                        todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="bg-gray-50 border border-gray-200 p-3 rounded-lg"
                            >
                                {todo.title}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};
export default CreateTodo
