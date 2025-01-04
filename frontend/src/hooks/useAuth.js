import { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../config';
import { useAppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setUser, setIsAuthenticated } = useAppContext();

    const login = async (formData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${SERVER_URL}/login`, formData, { withCredentials: true });
            setUser(response.data.user);
            setIsAuthenticated(true);
            navigate("/");
        } catch (error) {
            if (error.status === 400) {
                alert("Invalid Email or password");
            } else if (error.status === 500) {
                alert("Error during Login");
            } else if (error.status === 403) {
                alert("You are already logged in");
            } else {
                alert("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const signup = async (formData, setSignupDetails) => {
        setLoading(true);
        const details = {
            email: formData.email,
            password: formData.password,
            profile: {
                name: formData.name,
            }
        }
        try {
            const response = await axios.post(`${SERVER_URL}/register`, details, { withCredentials: true });
            if (response.status === 201) {
                setSignupDetails(details);
                alert('OTP sent to your email!');
                navigate("/verify-otp");
            }
        } catch (error) {
            if (error.response) {
                const { status } = error.response;
                if (status === 409) {
                    alert("User already exists");
                } else if (status === 500) {
                    alert("Error during registration");
                } else if (status === 403) {
                    alert("You are already logged in");
                } else if (status === 400) {
                    alert("Invalid credentials");
                } else {
                    alert("An unexpected error occurred");
                }
            } else {
                alert("Network error or server is unreachable");
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, login, signup };
};

export default useAuth;
