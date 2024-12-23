import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import axios from 'axios';
import { SERVER_URL } from '../../../config';
import { useAppContext } from '../../App';


const LoginPage = () => {
    const navigate = useNavigate();
    const { setUser,setIsAuthenticated } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${SERVER_URL}/login`, {email,password},{ withCredentials: true } );
            setUser(response.data.user);
            setIsAuthenticated(true)
            navigate("/");
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="signup-text">
                    Don't have an account? <a onClick={()=>navigate("/signup")}>Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
