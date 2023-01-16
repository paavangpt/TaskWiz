import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import image from "../../assets/800w/Asset1.png";
import { useAuthState } from "react-firebase-hooks/auth";
import "./HomePage.css";
import { auth } from "../../Data/Firebase";

const HomePage = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (!user) {
            return;
        }
        // navigate("/app");
    }, [user, loading]);

    return loading ? (
        <div className="home__container">
            <h1>Loading...</h1>
        </div>
    ) : (
        <div className="home__container w-full h-full flex place-items-center">
            <div className="header w-full h-full mx-20 flex place-items-center px-40 ">
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
                <div className="header__left">
                    <h2>Manage your task with simplicity</h2>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Adipisci architecto, vitae facere repellat
                        inventore, aut tempore officia nesciunt animi earum.
                    </p>
                    <button
                        className="header__btn__get__started  flex place-items-center gap-3"
                        onClick={(e) => {
                            navigate("/register");
                        }}
                    >
                        Get Started
                        <FaArrowRight />
                    </button>
                </div>
                <div className="header__right">
                    <img src={image} alt="" width={500} height={500} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
