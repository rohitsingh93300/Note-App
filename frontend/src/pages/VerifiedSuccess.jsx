import React from "react";
import Particles from "./Particles";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VerifiedSuccess = () => {
  return (
    <div className="relative w-full h-[760px] bg-black overflow-hidden">
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

      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white/5 p-6 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Email Verified Successfully!</h2>
          <p className="text-gray-200 mb-2">You can now log in to your account.</p>
          <Link to={'/login'}><Button className='relative cursor-pointer'>Login</Button></Link>
        </div>
      </div>


    </div>
  );
};

export default VerifiedSuccess;
