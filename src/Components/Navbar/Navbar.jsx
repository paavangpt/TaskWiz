import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="nav">
            <div className="nav__left">
                <h2 className="nav__logo">TaskWiz</h2>
            </div>
            <div className="nav__right flex gap-3">
                <button
                    className="nav__btn"
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Login
                </button>
                <button
                    className="nav__btn"
                    onClick={() => {
                        navigate("/register");
                    }}
                >
                    Create Account
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
