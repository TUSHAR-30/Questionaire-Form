// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAppContext } from "../../../App";
// import UserMenuDropdown from "./UserMenuDropdown";
// import "./Navbar.css";

// const Navbar = () => {
//     const navigate = useNavigate();
//     const { isAuthenticated, loading } = useAppContext();

//     return (
//         <nav className="navbar">
//             <div className="navbar-left">
//                 <Link to="/" className="webapp-name-link">
//                     <h1 className="webapp-name">Drag Forms</h1>
//                 </Link>
//             </div>

//             {!loading && <div className="navbar-right">
//                 {isAuthenticated ? (
//                     <>
//                         <UserMenuDropdown />
//                         <button className="create-form-btn" onClick={() => navigate("/createform")}>Create Form</button>
//                     </>
//                 ) :
//                 (
//                         <>
//                             <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
//                             <button className="login-btn" onClick={() => navigate("/signup")}>Signup</button>
//                         </>
//                 )}
//             </div>
//             }
//         </nav>
//     );
// };

// export default Navbar;




import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../App";
import UserMenuDropdown from "./UserMenuDropdown";

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAppContext();

    return (
        <nav className="flex justify-between items-center py-2 px-5 bg-gray-800 text-white w-full">
            <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold cursor-pointer">
                    Drag Forms
                </Link>
            </div>

            {!loading && (
                <div className="flex gap-3">
                    {isAuthenticated ? (
                        <>
                            <UserMenuDropdown />
                            <button
                                className="hidden sm:block bg-gray-700  border-white text-white px-4 py-2 rounded-md cursor-pointer hover:bg-transparent hover:ring-1 hover:ring-white "
                                onClick={() => navigate("/createform")}
                            >
                                Create Form
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                 className="bg-gray-700 border-white text-white px-4 py-2 rounded-md cursor-pointer hover:bg-transparent hover:ring-1 hover:ring-white"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                            <button
                                 className="bg-gray-700 border-white text-white px-4 py-2 rounded-md cursor-pointer hover:bg-transparent hover:ring-1 hover:ring-white"
                                onClick={() => navigate("/signup")}
                            >
                                Signup
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
