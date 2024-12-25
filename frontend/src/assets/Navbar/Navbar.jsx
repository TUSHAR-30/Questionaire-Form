import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import { SERVER_URL } from '../../../config';
import "./Navbar.css"; 
import { useAppContext } from "../../App";

const Navbar = () => {

    const { isAuthenticated, user,setUser,setIsAuthenticated } = useAppContext();
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Loading state


     async function handleLogout(){
        setLoading(true)
        try {
            const response = await axios.get(`${SERVER_URL}/logout`, { withCredentials: true } );
            console.log(response)
            setUser({});
            setIsAuthenticated(false)
        } catch (error) {
            console.log(error.response.data.message);
        } finally{
            setLoading(false)
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="navbar">
             {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            <div className="navbar-left">
                <h1 className="webapp-name" onClick={() =>navigate("/")}>MyWebApp</h1>
            </div>

            <div className="navbar-right">
                {isAuthenticated ? (
                    <>
                        <div className="user-menu">
                            <button className="user-icon" onClick={toggleDropdown}>
                                <FaUserCircle size={24} /> {user.profile.name}
                            </button>
                            {showDropdown && (
                                <div className="dropdown">
                                    <ul>
                                        {/* <li onClick={() => console.log("Profile clicked")}>User Profile</li> */}
                                        <li onClick={()=>navigate("/forms")}>Forms</li>
                                        <li onClick={handleLogout}>Logout</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <button className="create-form-btn" onClick={() => navigate("/createform")}>Create Form</button>
                    </>
                ) :
                    (
                        <>
                            <button className="login-btn" onClick={() =>navigate("/login")}>Login</button>
                            <button className="login-btn" onClick={() =>navigate("/signup")}>Signup</button>
                        </>


                    )}
            </div>
        </nav>
    );
};

export default Navbar;

// Example Usage:
// <Navbar isAuthenticated={true} user={{ username: "JohnDoe" }} />
