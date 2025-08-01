import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
                        navigate("/login");
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

        <div className="relative w-full h-[760px] bg-green-100 overflow-hidden">
            <div className="min-h-screen flex items-center justify-center ">
                <div className="bg-white p-6 rounded-xl shadow-md text-center w-[90%] max-w-md">
                    <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
                </div>
            </div>
        </div>
    );
};

export default Verify;
