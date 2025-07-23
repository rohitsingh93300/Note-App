import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import Verify from './pages/Verify'
import VerifiedSuccess from './pages/VerifiedSuccess'
import Navbar from './components/Navbar'
import ForgotPassword from './pages/ForgotPassword'
import ProtectedRoute from './components/ProtectedRoute'
import VerifyOTP from './pages/VerifyOTP'
import ChangePassword from './pages/ChangePassword'
import CreateTodo from './pages/CreateTodo'

const router = createBrowserRouter([
  {
    path:'/',
    element:<ProtectedRoute><Navbar/><Home/></ProtectedRoute>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/verify',
    element:<VerifyEmail/>
  },
  {
    path:'/verify/:token',
    element:<Verify/>
  },
  {
    path:"/verified-success",
    element:<VerifiedSuccess/>
  },
  {
    path:"/forgot-password",
    element:<ForgotPassword/>
  },
  {
    path:"/verify-otp/:email",
    element:<VerifyOTP/>
  },
  {
    path:"/change-password/:email",
    element:<ChangePassword/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/create-todo',
    element:<ProtectedRoute><Navbar/><CreateTodo/></ProtectedRoute>
  },
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
