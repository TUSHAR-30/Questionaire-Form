import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useAuthForm from '../../hooks/useAuthForm';
import useAuth from '../../hooks/useAuth';
import SignupDetailsContext from '../../Context/SignupDetailsContext';
import './SignupPage.css';

const SignupPage = () => {
    const { setSignupdetails } = useContext(SignupDetailsContext);

    const { formData, errors, isPasswordVisible, handleChange, handleErors, togglePasswordVisibility, setErrors } = useAuthForm(
        { name: '', email: '', password: '' },
        (name, value) => validateField(name, value)
    );

    const { loading, signup } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        let finalErrors = {};
        Object.keys(formData).forEach((key) => finalErrors = handleErors(key, formData[key]));
        if (Object.values(finalErrors).some((error) => error)) return;

        signup(formData, setSignupdetails);
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                return /^(?=.*[a-zA-Z]).{1,}$/.test(value) ? '' : 'Enter valid name';
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? '' : 'Enter a valid email address.';
            case 'password':
                return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value) ? '' : 'Password must be at least 8 characters long and contain at least 1 alphabet and 1 digit.';
            default:
                return '';
        }
    };

    return (
        <div className="signup-page">
            {loading && <div className="loading-overlay"><div className="spinner"></div></div>}
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            autoComplete='name'
                            required
                        />
                        <div className={`error ${errors.name ? 'show-error' : ''}`}>{errors.name}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete='email'
                            required
                        />
                        <div className={`error ${errors.email ? 'show-error' : ''}`}>{errors.email}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            autoComplete='new-password'
                            required
                        />
                        <div className={`error ${errors.password ? 'show-error' : ''}`}>{errors.password}</div>
                        <div className="toggle-passwordVisibility-container">
                            <input type="checkbox" checked={isPasswordVisible} onChange={togglePasswordVisibility} />
                            <span>Show Password</span>
                        </div>
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <p className="login-text">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
