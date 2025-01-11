import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../../../config';
import useAuthForm from '../../hooks/useAuthForm';
import useAuth from '../../hooks/useAuth';
import { FcGoogle } from "react-icons/fc";
import LoadingSpinner from '../../components/LoadingSpinner';
import './LoginPage.css';


const LoginPage = () => {
    const { formData, errors, isPasswordVisible, handleChange, togglePasswordVisibility, setErrors } = useAuthForm(
        { email: '', password: '' },
        (name, value) => validateField(name, value)
    );

    const { loading, login } = useAuth();

    const [isInvalidSession, setisInvalidSession] = useState(false);


    const handleSubmit = async(e) => {
        e.preventDefault();
        const loginresult = await login(formData);
        if (loginresult && loginresult.invalidSession) setisInvalidSession(true)
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
        <div className="login-page">
            {loading && <LoadingSpinner />}
            {!isInvalidSession ? (<div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                        <div className="toggle-passwordVisibility-container">
                            <input type="checkbox" checked={isPasswordVisible} onChange={togglePasswordVisibility} />
                            <span>Show Password</span>
                        </div>
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="signup-text">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
                <button onClick={handleGoogleLogin} className="google-login-button">
                    <FcGoogle size={20} />
                    Login with Google
                </button>
            </div>)
                :
                (<div className='invalid-session'>We have already received too many login requests with wrong credentials from this IP address. Please try after some time.</div>)
            }
        </div>
    );
};

export default LoginPage;

