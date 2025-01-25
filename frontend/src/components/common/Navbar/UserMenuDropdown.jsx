// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { FaUserCircle } from "react-icons/fa";
// import axios from 'axios';
// import { useAppContext } from '../../../App';
// import useDropdown from '../../../hooks/useDropdown';
// import { SERVER_URL } from '../../../../config';
// import LoadingSpinner from '../../LoadingSpinner';


// function UserMenuDropdown() {
//     const navigate = useNavigate();
//     const { user, setUser, setIsAuthenticated } = useAppContext();
//     const { showDropdown, dropdownRef, buttonRef, toggleDropdown, hideDropdown } = useDropdown();
//     const [logoutloading, setlogoutLoading] = useState(false); // Loading state

//     function handleNavigateToFormPage() {
//         hideDropdown();
//         navigate("/forms")
//     }

//     async function handleLogout() {
//         hideDropdown()
//         setlogoutLoading(true)
//         try {
//             const response = await axios.get(`${SERVER_URL}/logout`, { withCredentials: true });
//             console.log(response)
//             setUser({});
//             setIsAuthenticated(false);
//         } catch (error) {
//             console.log(error.response.data.message);
//         } finally {
//             setlogoutLoading(false)
//         }
//     };

//     return (
//         <div className="user-menu">
//              {logoutloading && <LoadingSpinner /> }
//             <button className="user-icon" onClick={toggleDropdown} ref={buttonRef}>
//                 {/* <FaUserCircle size={20} /> */}
//                  {user.profile.name}
//             </button>
//             {showDropdown && (
//                 <div className="dropdown" ref={dropdownRef}>
//                     <ul>
//                         <li onClick={handleNavigateToFormPage}>Forms</li>
//                         <li onClick={handleLogout}>Logout</li>
//                     </ul>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default UserMenuDropdown



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../App';
import useDropdown from '../../../hooks/useDropdown';
import axios from 'axios';
import { SERVER_URL } from '../../../../config';
import LoadingSpinner from '../../LoadingSpinner';

function UserMenuDropdown() {
    const navigate = useNavigate();
    const { user, setUser, setIsAuthenticated } = useAppContext();
    const { showDropdown, dropdownRef, buttonRef, toggleDropdown, hideDropdown } = useDropdown();
    const [logoutLoading, setLogoutLoading] = useState(false);

    function handleNavigateToFormPage() {
        hideDropdown();
        navigate("/forms");
    }

    async function handleLogout() {
        hideDropdown();
        setLogoutLoading(true);
        try {
            const response = await axios.get(`${SERVER_URL}/logout`, { withCredentials: true });
            setUser({});
            setIsAuthenticated(false);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setLogoutLoading(false);
        }
    }

    return (
        <div className="relative">
            {logoutLoading && <LoadingSpinner />}
            <button 
                className="bg-gray-700 text-white border-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-2 hover:bg-transparent hover:ring-1 hover:ring-white"
                onClick={toggleDropdown} 
                ref={buttonRef}
            >
                {user.profile.name}
            </button>
            {showDropdown && (
                <div className="absolute top-10 right-0 bg-white text-black border border-gray-300 rounded-md shadow-lg w-40" ref={dropdownRef}>
                    <ul className="list-none p-0 m-0">
                        <li 
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={handleNavigateToFormPage}
                        >
                            Forms
                        </li>
                        <li 
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={handleLogout}
                        >
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserMenuDropdown;
