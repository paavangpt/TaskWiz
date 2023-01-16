import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Data/Firebase";
import "./SignOutConfirmationModal.css";

const SignOutConfirmationModal = (props) => {

    const navigate = useNavigate();

    const setIsSigningOutFalse = () => {
        props.setIsSigningOut(false);
    }

    const handleSignOut = () => {
        signOut(auth).then(()=>{
            navigate("/");
        });
    }

    return (
        <div className="signing__out__confirmation__container">
            <p className="w-full text-center">Are you sure you want to sign out?</p>
            <div className="signing__out__btns flex gap-3">
                <button className="signing__out__btn signing__out__btn__yes" onClick={handleSignOut}>
                    Yes
                </button>
                <button className="signing__out__btn signing__out__btn__cancel"
                onClick={setIsSigningOutFalse}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default SignOutConfirmationModal;
