// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { SERVER_URL } from "../../../config";
// import { useNavigate } from "react-router-dom";
// import SignupDetailsContext from "../../Context/SignupDetailsContext";
// import { useAppContext } from "../../App";
// import LoadingSpinner from "../../components/LoadingSpinner";
// import "./VerifyOTPPage.css";

// const VerifyOTPPage = () => {
//     const navigate = useNavigate()
//     const [otp, setOtp] = useState(new Array(6).fill(""));
//     const { signupdetails, setSignupdetails } = useContext(SignupDetailsContext)
//     const { setUser, setIsAuthenticated } = useAppContext();
//     const [loading, setLoading] = useState(false); // Loading state

//     const handleChange = (element, index) => {
//         if (isNaN(element.value)) {
//             return;
//         }

//         const newOtp = [...otp];
//         newOtp[index] = element.value;
//         setOtp(newOtp);

//         // Focus on the next input field
//         if (element.nextSibling) {
//             element.nextSibling.focus();
//         }
//     };

//     const handleSubmit = async () => {
//         const otpCode = otp.join("");
//         setLoading(true);
//         try {
//             const response = await axios.post(`${SERVER_URL}/verify-otp`, {
//                 otp: otpCode,
//                 ...signupdetails
//             }, { withCredentials: true }
//             )
//             if (response.status === 201) {
//                 alert("OTP verified successfully!");
//                 // Navigate to another page or take further actions
//                 setSignupdetails(null);
//                 setUser(response.data.user);
//                 setIsAuthenticated(true)
//                 navigate("/")
//             }
//         } catch (error) {
//             alert("Invalid OTP or verification failed");
//         } finally{
//             setLoading(false)
//         }
//     };

//     if (!signupdetails) {
//         navigate("/")
//         return;
//     }

//     return (
//         <div className="otp-page">
//              {loading && <LoadingSpinner /> }
//             <div className="otp-container">
//                 <h3>Do not refresh this page</h3>
//                 <h2>Verify OTP</h2>
//                 <p>Enter the 6-digit code sent to your registered email/phone number.</p>
//                 <div className="otp-inputs">
//                     {otp.map((value, index) => (
//                         <input
//                             key={index}
//                             type="text"
//                             maxLength="1"
//                             value={value}
//                             onChange={(e) => handleChange(e.target, index)}
//                         />
//                     ))}
//                 </div>
//                 <button onClick={handleSubmit}>Submit</button>
//             </div>
//         </div>
//     );
// };

// export default VerifyOTPPage;



import React, { useContext, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import SignupDetailsContext from "../../Context/SignupDetailsContext";
import { useAppContext } from "../../App";
import LoadingSpinner from "../../components/LoadingSpinner";

const VerifyOTPPage = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const { signupdetails, setSignupdetails } = useContext(SignupDetailsContext);
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
            const response = await axios.post(
                `${SERVER_URL}/verify-otp`,
                {
                    otp: otpCode,
                    ...signupdetails,
                },
                { withCredentials: true }
            );
            if (response.status === 201) {
                alert("OTP verified successfully!");
                setSignupdetails(null);
                setUser(response.data.user);
                setIsAuthenticated(true);
                navigate("/");
            }
        } catch (error) {
            alert("Invalid OTP or verification failed");
        } finally {
            setLoading(false);
        }
    };

    if (!signupdetails) {
        navigate("/");
        return;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            {loading && <LoadingSpinner />}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h3 className="text-gray-700 mb-2">Do not refresh this page</h3>
                <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
                <p className="text-gray-600 mb-6">
                    Enter the 6-digit code sent to your registered email/phone number.
                </p>
                <div className="flex justify-center gap-2 mb-6">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={value}
                            onChange={(e) => handleChange(e.target, index)}
                            className="w-10 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default VerifyOTPPage;
