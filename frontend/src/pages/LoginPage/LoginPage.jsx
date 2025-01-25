// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { SERVER_URL } from '../../../config';
// import useAuthForm from '../../hooks/useAuthForm';
// import useAuth from '../../hooks/useAuth';
// import { FcGoogle } from "react-icons/fc";
// import LoadingSpinner from '../../components/LoadingSpinner';
// import './LoginPage.css';


// const LoginPage = () => {
//     const { formData, errors, isPasswordVisible, handleChange, togglePasswordVisibility, setErrors } = useAuthForm(
//         { email: '', password: '' },
//         (name, value) => validateField(name, value)
//     );

//     const { loading, login } = useAuth();

//     const [isInvalidSession, setisInvalidSession] = useState(false);


//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         const loginresult = await login(formData);
//         if (loginresult && loginresult.invalidSession) setisInvalidSession(true)
//     };

//     const handleGoogleLogin = () => {
//         window.open(`${SERVER_URL}/auth/google`, "_self");
//     };

//     const validateField = (name, value) => {
//         switch (name) {
//             case 'email':
//                 return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? '' : 'Enter a valid email address.';
//             case 'password':
//                 return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value) ? '' : 'Password must be at least 8 characters long and contain at least 1 alphabet and 1 digit.';
//             default:
//                 return '';
//         }
//     };

//     return (
//         <div className="login-page">
//             {loading && <LoadingSpinner />}
//             {!isInvalidSession ? (<div className="login-container">
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type={isPasswordVisible ? 'text' : 'password'}
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="Enter your password"
//                             required
//                         />
//                         <div className="toggle-passwordVisibility-container">
//                             <input type="checkbox" checked={isPasswordVisible} onChange={togglePasswordVisibility} />
//                             <span>Show Password</span>
//                         </div>
//                     </div>
//                     <button type="submit" className="login-button">Login</button>
//                 </form>
//                 <p className="signup-text">
//                     Don't have an account? <Link to="/signup">Sign up</Link>
//                 </p>
//                 <button onClick={handleGoogleLogin} className="google-login-button">
//                     <FcGoogle size={20} />
//                     Login with Google
//                 </button>
//             </div>)
//                 :
//                 (<div className='invalid-session'>We have already received too many login requests with wrong credentials from this IP address. Please try after some time.</div>)
//             }
//         </div>
//     );
// };

// export default LoginPage;





import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../../../config';
import useAuthForm from '../../hooks/useAuthForm';
import useAuth from '../../hooks/useAuth';
import { FcGoogle } from "react-icons/fc";
import LoadingSpinner from '../../components/LoadingSpinner';

const LoginPage = () => {
    const { formData, errors, isPasswordVisible, handleChange, togglePasswordVisibility, setErrors } = useAuthForm(
        { email: '', password: '' },
        (name, value) => validateField(name, value)
    );

    const { loading, login } = useAuth();

    const [isInvalidSession, setisInvalidSession] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginresult = await login(formData);
        if (loginresult && loginresult.invalidSession) setisInvalidSession(true);
    };

    const handleGoogleLogin = () => {
        window.open(`${SERVER_URL}/auth/google`, "_self");
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? '' : 'Enter a valid email address.';
            case 'password':
                return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value) ? '' : 'Password must be at least 8 characters long and contain at least 1 alphabet and 1 digit.';
            default:
                return '';
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200 px-4">
            {loading && <LoadingSpinner />}
            {!isInvalidSession ? (
                <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-6">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="text-left">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md text-base focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="text-left">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md text-base focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div className="flex items-center mt-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={isPasswordVisible}
                                    onChange={togglePasswordVisibility}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-gray-600">Show Password</span>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center w-full mt-6 border-1 border-solid border-gray-300 py-2 px-4 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    >
                        <FcGoogle size={20} className="mr-2" />
                        Login with Google
                    </button>
                </div>
            ) : (
                <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow text-center">
                    <p className="text-gray-800 font-medium">
                        We have already received too many login requests with wrong credentials from this IP address. Please try again later.
                    </p>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
