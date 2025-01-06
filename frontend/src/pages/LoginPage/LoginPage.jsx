import React from 'react';
import { Link } from 'react-router-dom';
import useAuthForm from '../../hooks/useAuthForm';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner';
import './LoginPage.css';

const LoginPage = () => {
    const { formData, errors, isPasswordVisible, handleChange, togglePasswordVisibility, setErrors } = useAuthForm(
        { email: '', password: '' },
        (name, value) => validateField(name, value)
    );

    const { loading, login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
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
            <div className="login-container">
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
            </div>
        </div>
    );
};

export default LoginPage;

