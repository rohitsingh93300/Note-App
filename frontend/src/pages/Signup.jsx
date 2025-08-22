import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import Google from "../assets/googleLogo.png"

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      setIsLoading(true)
      const res = await axios.post(`http://localhost:8000/api/v1/user/register`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (res.data.success) {
        navigate('/verify')
        toast.success(res.data.message)
        dispatch(setUser())
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.errors[0])

    } finally {
      setIsLoading(false)
    }

  };

  return (
    <div className="relative w-full h-screen md:h-[760px] bg-green-100 overflow-hidden">
      <div className="min-h-screen flex flex-col to-muted/20">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-green-600">Create your account</h1>
              <p className="text-gray-600">Start organizing your thoughts and ideas today</p>
            </div>

            <Card className="bg-white">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center text-green-600">Sign up</CardTitle>
                <CardDescription className="text-center">
                  Create your account to get started with NotesApp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label className="text-gray-800">Full Name</Label>
                    <Input
                      name="username"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className='relative'
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-800">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className=''
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-800">Password</Label>
                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className='focus:border-blue-500 '
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}

                      >
                        {showPassword ? <EyeOff className="h-4 w-4 text-gray-600" /> : <Eye className="h-4 w-4 text-gray-600" />}
                      </Button>
                    </div>
                    {/* <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p> */}
                  </div>

                  <Button type="submit" className="w-full border border-gray-200 bg-green-600 hover:bg-green-500 cursor-pointer relative" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                  <Button className='w-full' variant="outline" onClick={() => window.open("http://localhost:8000/auth/google", "_self")}>
                    <img src={Google} alt="" className="w-5"/> Login with Google
                  </Button>
                </form>
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link to="/login" className="text-green-600 hover:underline font-medium relative">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Signup;

