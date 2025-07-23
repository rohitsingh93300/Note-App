import React from "react";
import Particles from "./Particles";

const VerifyEmail = () => {
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

      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="bg-white/5 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 ">✅ Check Your Email</h2>
          <p className="text-gray-400 text-sm">
            We've sent you an email to verify your account. Please check your inbox and click the verification link.
          </p>
        </div>
      </div>


    </div>
  );
};

export default VerifyEmail;
