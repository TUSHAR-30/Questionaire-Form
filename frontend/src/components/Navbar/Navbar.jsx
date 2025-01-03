import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";
import UserMenuDropdown from "./UserMenuDropdown";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAppContext();

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="webapp-name-link">
                    <h1 className="webapp-name">Drag Forms</h1>
                </Link>
            </div>

            {!loading && <div className="navbar-right">
                {isAuthenticated ? (
                    <>
                        <UserMenuDropdown />
                        <button className="create-form-btn" onClick={() => navigate("/createform")}>Create Form</button>
                    </>
                ) :
                (
                        <>
                            <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
                            <button className="login-btn" onClick={() => navigate("/signup")}>Signup</button>
                        </>
                )}
            </div>
            }
        </nav>
    );
};

export default Navbar;

