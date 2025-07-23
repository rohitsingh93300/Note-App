import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Particles from "./Particles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
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
      const res = await axios.post(`http://localhost:8000/api/v1/user/register`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (res.data.success) {
        navigate('/verify')
        alert(res.data.message);

      }
    } catch (error) {
      console.log(error);

    }

  };

  return (
    <div className="relative w-full h-screen md:h-[760px] bg-black overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Foreground content */}
      <div className="min-h-screen flex flex-col to-muted/20">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-200">Create your account</h1>
              <p className="text-muted-foreground">Start organizing your thoughts and ideas today</p>
            </div>

            <Card className="bg-white/10">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center text-gray-200">Sign up</CardTitle>
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
                    <Label className="text-gray-200">Full Name</Label>
                    <Input                   
                      name="username" 
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.username}
                      onChange={handleChange}                   
                      required
                      disabled={isLoading}
                      className='relative text-white'
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-200">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className='relative text-white'
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-200">Password</Label>
                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}                      
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        className='text-white'
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}

                      >
                        {showPassword ? <EyeOff className="h-4 w-4 text-gray-200" /> : <Eye className="h-4 w-4 text-gray-200" />}
                      </Button>
                    </div>
                    {/* <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p> */}
                  </div>

                  <Button type="submit" className="w-full border border-gray-200 cursor-pointer relative" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" disabled={isLoading}>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" disabled={isLoading}>
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.160 1.219-5.160s-.312-.623-.312-1.543c0-1.444.83-2.518 1.863-2.518.878 0 1.303.66 1.303 1.450 0 .885-.564 2.207-.854 3.434-.243 1.030.516 1.871 1.530 1.871 1.836 0 3.248-1.935 3.248-4.734 0-2.476-1.78-4.206-4.324-4.206-2.94 0-4.67 2.207-4.67 4.487 0 .887.344 1.838.772 2.356.085.103.097.194.072.299-.079.33-.254 1.037-.289 1.183-.046.191-.148.232-.342.14-1.282-.596-2.084-2.464-2.084-3.969 0-3.259 2.368-6.250 6.833-6.250 3.583 0 6.369 2.551 6.369 5.964 0 3.558-2.244 6.423-5.362 6.423-1.047 0-2.033-.547-2.370-1.201l-.643 2.449c-.232.896-.859 2.021-1.279 2.702.964.298 1.984.455 3.063.455 6.624 0 11.990-5.367 11.990-11.987C24.007 5.367 18.641.001 12.017.001z" />
                    </svg>
                    GitHub
                  </Button>
                </div>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link to="/login" className="text-gray-300 hover:underline font-medium relative">
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

