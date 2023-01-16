import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import image from "../../assets/800w/Asset1.png";
import { useAuthState } from "react-firebase-hooks/auth";
import "./HomePage.css";
import { auth } from "../../Data/Firebase";
import Navbar from "../../Components/Navbar/Navbar";

const HomePage = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (!user) {
            return;
        }
        navigate("/app");
    }, [user, loading]);

    return loading ? (
        <div className="home__container">
            <h1>Loading...</h1>
        </div>
    ) : (
        <div className="home__container w-full h-full flex place-items-center">
            <div className="header w-full h-full mx-20 flex place-items-center px-40 ">
                <Navbar />
                <div className="header__left">
                    <h2>Manage your tasks with simplicity, <span className="header__title__span">with TaskWiz 🔥</span></h2>
                    <p>
                        Do you also get irritated when managing multiple tasks 🎯 throughout your day becomes a mess. Well, We've brought you the <i><b>"MESSI"</b></i> of managing task. Let's Go 
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
