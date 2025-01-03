import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import { SERVER_URL } from '../../../config';
import "./Navbar.css"; 
import { useAppContext } from "../../App";

const Navbar = () => {

    const { isAuthenticated, user,setUser,setIsAuthenticated,loading } = useAppContext();
    const [showDropdown, setShowDropdown] = useState(false);
    const modalRef = useRef(null);  // Create a ref for the modal
    const buttonRef = useRef(null);  // Create a ref for the button
    const navigate = useNavigate();
    const [logoutloading, setlogoutLoading] = useState(false); // Loading state


     async function handleLogout(){
        setShowDropdown(false)
        setlogoutLoading(true)
        try {
            const response = await axios.get(`${SERVER_URL}/logout`, { withCredentials: true } );
            console.log(response)
            setUser({});
            setIsAuthenticated(false)
        } catch (error) {
            console.log(error.response.data.message);
        } finally{
            setlogoutLoading(false)
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        function handleClickOutside(event) {

            // Check if the click is outside the modal or the button
            if (modalRef.current &&
                !modalRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setShowDropdown(false); // Close the modal on outside click
            }
        }

        if (showDropdown) {
            // Attach the event listener only when the modal is open
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            // Remove the event listener when the modal is closed
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Cleanup function to remove the listener when the component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]); // Re-run effect when isModalOpen changes


    return (
        <nav className="navbar">
             {logoutloading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            <div className="navbar-left">
                <h1 className="webapp-name" onClick={() =>navigate("/")}>MyWebApp</h1>
            </div>

           {!loading && <div className="navbar-right">
                {isAuthenticated ? (
                    <>
                        <div className="user-menu">
                            <button className="user-icon" onClick={toggleDropdown} ref={buttonRef}>
                                <FaUserCircle size={24} /> {user.profile.name}
                            </button>
                            {showDropdown && (
                                <div className="dropdown" ref={modalRef}>
                                    <ul>
                                        {/* <li onClick={() => console.log("Profile clicked")}>User Profile</li> */}
                                        <li onClick={()=>{setShowDropdown(false); navigate("/forms")}}>Forms</li>
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
            </div>}
        </nav>
    );
};

export default Navbar;

// Example Usage:
// <Navbar isAuthenticated={true} user={{ username: "JohnDoe" }} />
