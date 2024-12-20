import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import { SERVER_URL } from '../../../config';
import "./Navbar.css"; 

const Navbar = ({ isAuthenticated, user,setUser,setIsAuthenticated }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

     async function handleLogout(){
        try {
            const response = await axios.get(`${SERVER_URL}/logout`, { withCredentials: true } );
            console.log(response)
            setUser({});
            setIsAuthenticated(false)
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="webapp-name" onClick={() =>navigate("/dragforms")}>MyWebApp</h1>
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
                                        <li onClick={() => console.log("Profile clicked")}>User Profile</li>
                                        <li onClick={()=>navigate("/dragforms/forms")}>Forms</li>
                                        <li onClick={handleLogout}>Logout</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <button className="create-form-btn" onClick={() => console.log("Create Form clicked")}>Create Form</button>
                    </>
                ) :
                    (
                        <>
                            <button className="login-btn" onClick={() =>navigate("/dragforms/login")}>Login</button>
                            <button className="login-btn" onClick={() =>navigate("/dragforms/signup")}>Signup</button>
                        </>


                    )}
            </div>
        </nav>
    );
};

export default Navbar;

// Example Usage:
// <Navbar isAuthenticated={true} user={{ username: "JohnDoe" }} />
