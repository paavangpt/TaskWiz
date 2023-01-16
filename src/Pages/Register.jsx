import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
// import {
//   auth,
//     registerWithEmailAndPassword,
//     signInWithGoogle,
// } from "../Data/Firebase";
// import "./Register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    return (
        <div className="register__container">
            
        </div>
    );
};

export default Register;
