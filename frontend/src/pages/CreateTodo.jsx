import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { toast } from 'sonner';


const CreateTodo = () => {
    const [todos, setTodos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false)
    const [updateDialog, setUpdateDialog] = useState(false)
    const [refreshPage, setRefreshPage] = useState(false)
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    const accessToken = localStorage.getItem('accessToken')
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    })

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const res = await axios.post(`http://localhost:8000/api/v1/todo/create`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (res.data.success) {
            toast.success(res.data.message)
            setTodos([...todos, res.data.data])
            setOpenDialog(false)
            setFormData("")
        }
        console.log(formData);

    }

    const getAllTodo = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/todo/get`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                setTodos(res.data.todos)
                console.log('todo called');

            }
        } catch (error) {
            console.log(error);

        }
    }

    const onDeleteHandler = async (noteId) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/todo/delete/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                setRefreshPage(prev => !prev)
            }
        } catch (error) {
            console.log(error);

        }
    }

    const onUpdateHandler = async () => {
        try {
            const res = await axios.put(`http://localhost:8000/api/v1/todo/update/${selectedTodoId}`,formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                toast.success("Todo updated successfully")
                setRefreshPage(prev => !prev); 
                setUpdateDialog(false); 
                setFormData({ title: "", description: "" }); 
                setSelectedTodoId(null);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllTodo()
    }, [refreshPage])


    return (
        <div className="h-screen md:h-[700px] bg-gray-100 p-6 relative">
            {
                todos.length > 0 ? <div className='grid grid-cols-4 gap-7 max-w-7xl mx-auto'>
                    {
                        todos.map((note, index) => {
                            return <div key={index} className='bg-white p-5 rounded-lg relative'>
                            <img src={note.image} alt="" />
                                <h1 className='font-semibold text-gray-800 text-xl my-3'>{note.title}</h1>
                                <p className='text-gray-700 line-clamp-4'>{note.description}</p>
                                <div className='flex gap-2 mt-3 absolute right-2 bottom-2'>
                                    <Edit onClick={() => {
                                        setUpdateDialog(true),
                                            setFormData({ title: note.title, description: note.description }),
                                            setSelectedTodoId(note._id);
                                    }}
                                        className='text-green-600 cursor-pointer' />
                                    <Trash2 onClick={() => onDeleteHandler(note._id)} className='text-red-400 cursor-pointer' />
                                </div>
                            </div>
                        })
                    }

                </div> : <div>
                    There is no todo to show
                </div>
            }


            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <div onClick={() => setOpenDialog(true)} className='bg-gray-800 w-max p-3 absolute bottom-10 right-20 rounded-lg cursor-pointer'>
                    <Plus className='text-white' />
                </div>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='text-center'>Add Note</DialogTitle>
                        <DialogDescription className='text-center'>
                            Enter the details below to create a note.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Ex-Reading books"
                            />
                        </div>
                        <div className="grid gap-3 relative">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description"
                                className='pb-6'
                                maxLength={200}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Write something here..." />
                            <p className="text-xs text-muted-foreground mt-1 absolute right-4 bottom-1">
                                {formData?.description?.length}/{200} characters
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={onSubmitHandler}>Add Note</Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>

            {/* update dialog */}
            <Dialog open={updateDialog} onOpenChange={setUpdateDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className='text-center'>Add Note</DialogTitle>
                        <DialogDescription className='text-center'>
                            Enter the details below to create a note.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Ex-Reading books"
                            />
                        </div>
                        <div className="grid gap-3 relative">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description"
                                className='pb-6'
                                maxLength={200}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Write something here..." />
                            <p className="text-xs text-muted-foreground mt-1 absolute right-4 bottom-1">
                                {formData?.description?.length}/{200} characters
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={onUpdateHandler}>Update Note</Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </div>
    );
};
export default CreateTodo
