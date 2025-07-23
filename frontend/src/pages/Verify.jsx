import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Particles from "./Particles";

const Verify = () => {
    const { token } = useParams(); // token from URL
    const [status, setStatus] = useState("Verifying...");
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                console.log("🔗 Token from URL:", token);
                const response = await axios.post("http://localhost:8000/api/v1/user/verify-email",{}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    //  withCredentials: true
                });
                console.log(response)
                if (response.data.success) {
                    setStatus("✅ Email Verified Successfully!");
                    setTimeout(() => {
                        navigate("/verified-success");
                    }, 2000);
                } else {
                    setStatus("❌ Invalid or Expired Token.");
                }
            } catch (error) {
                console.log(error);               
                // console.error("Verification error:", error.response?.data || error.message);
                setStatus("❌ Verification Failed. Please try again.");
            }
        };

        verifyEmail();
    }, [token, navigate]);

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
                <div className="bg-white/5 p-6 rounded-xl shadow-md text-center w-[90%] max-w-md">
                    <h2 className="text-xl font-semibold text-gray-200">{status}</h2>
                </div>
            </div>
        </div>
    );
};

export default Verify;
