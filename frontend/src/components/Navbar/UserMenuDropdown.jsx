import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import { useAppContext } from '../../App';
import useDropdown from '../../hooks/useDropdown';
import { SERVER_URL } from '../../../config';
import LoadingSpinner from '../LoadingSpinner';


function UserMenuDropdown() {
    const navigate = useNavigate();
    const { user, setUser, setIsAuthenticated } = useAppContext();
    const { showDropdown, dropdownRef, buttonRef, toggleDropdown, hideDropdown } = useDropdown();
    const [logoutloading, setlogoutLoading] = useState(false); // Loading state

    function handleNavigateToFormPage() {
        hideDropdown();
        navigate("/forms")
    }

    async function handleLogout() {
        hideDropdown()
        setlogoutLoading(true)
        try {
            const response = await axios.get(`${SERVER_URL}/logout`, { withCredentials: true });
            console.log(response)
            setUser({});
            setIsAuthenticated(false);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setlogoutLoading(false)
        }
    };

    return (
        <div className="user-menu">
             {logoutloading && <LoadingSpinner /> }
            <button className="user-icon" onClick={toggleDropdown} ref={buttonRef}>
                {/* <FaUserCircle size={20} /> */}
                 {user.profile.name}
            </button>
            {showDropdown && (
                <div className="dropdown" ref={dropdownRef}>
                    <ul>
                        <li onClick={handleNavigateToFormPage}>Forms</li>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default UserMenuDropdown