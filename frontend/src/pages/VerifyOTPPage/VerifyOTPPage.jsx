import React, { useContext, useState } from "react";
import "./VerifyOTPPage.css";
import axios from "axios";
import { SERVER_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import SignupDetailsContext from "../../Context/SignupDetailsContext";
import { useAppContext } from "../../App";

const VerifyOTPPage = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const { signupdetails, setSignupdetails } = useContext(SignupDetailsContext)
    const { setUser, setIsAuthenticated } = useAppContext();
    const [loading, setLoading] = useState(false); // Loading state


    const handleChange = (element, index) => {
        if (isNaN(element.value)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus on the next input field
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = async () => {
        const otpCode = otp.join("");
        setLoading(true);
        try {
            const response = await axios.post(`${SERVER_URL}/verify-otp`, {
                otp: otpCode,
                ...signupdetails
            }, { withCredentials: true }
            )
            if (response.status === 201) {
                alert("OTP verified successfully!");
                // Navigate to another page or take further actions
                setSignupdetails(null);
                setUser(response.data.user);
                setIsAuthenticated(true)
                navigate("/")
            }
        } catch (error) {
            alert("Invalid OTP or verification failed");
        } finally{
            setLoading(false)
        }
    };

    if (!signupdetails) {
        navigate("/")
        return;
    }

    return (
        <div className="otp-page">
             {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            <div className="otp-container">
                <h3>Do not refresh this page</h3>
                <h2>Verify OTP</h2>
                <p>Enter the 6-digit code sent to your registered email/phone number.</p>
                <div className="otp-inputs">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={value}
                            onChange={(e) => handleChange(e.target, index)}
                        />
                    ))}
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default VerifyOTPPage;

