import React from 'react'
import { BookA, BookOpen, LogOut, User } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';


const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth)
    console.log("user", user);
    
    const accessToken = localStorage.getItem('accessToken')
    const logoutHandler = async()=>{
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/logout`,{},{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            });
            if(res.data.success){
                dispatch(setUser(null))
                toast.success(res.data.message)
                localStorage.clear()
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <nav className='p-2 border-b border-gray-200 bg-transparent '>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                {/* logo section */}

                <div onClick={() => navigate('/')} className='flex gap-2 items-center'>
                    <BookOpen className='h-6 w-6 text-green-800' />
                    <h1 className='font-bold text-xl'><span className='text-green-600'>Notes</span>App</h1>
                </div>

                <div className='flex gap-7 items-center'>
                    <ul className='flex gap-7 items-center text-lg font-semibold'>
                        <li>Features</li>
                        <li>Pricing</li>
                        <li>About</li>
                        <li>{user?.username}</li>
                        {
                            user ?
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.avatar} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='w-[200px]'>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <User/>
                                            Profile                                           
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <BookA/>
                                            Notes
                                            </DropdownMenuItem>                                 
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem onClick={logoutHandler}><LogOut/>Log out</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                : <Link to={'/login'}><li>Sign in</li></Link>
                        }

                    </ul>
                    <Button className='bg-green-600 hover:bg-green-500'>Get Started</Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
