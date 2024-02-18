import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { User } from "react-feather";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaGoogle, FaRegistered, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { getData } from "../Data/DataProvider";
import { getData } from "../../Data/DataProvider";
import { auth, db, registerWithEmailAndPassword } from "../../Data/Firebase";
import "./Register.css";
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

    useEffect(() => {
        if(!user) {
            return;
        }
        navigate("/app");
    },[user, loading]);

    const handleLoginWithGoogle = (e) => {
        e.preventDefault();
        console.log("Came in here! Hyalkdjfaskldjfas ");
        signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
            const user = res.user;
            const q = query(
                collection(db, "users"),
                where("uid", "==", user.uid)
            );
            getDocs(q).then((res) => {
                console.log("inside log in checker");
                const docs = res.docs;
                console.log(docs);
                if(docs.length === 0) {
                    addDoc(collection(db, "users"), {
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        authProvider: "google"
                    }).then(() => {
                        addDoc(collection(db, "data"), {
                            uid: user.uid,
                            data: getData()
                        });
                    });
                }
            })
        });
        // signInWithGoogle().then((user) => {
        //     console.log(user);
        // });
        console.log("Exiting");
    };


    function handleRegister(e) {
        e.preventDefault();
        registerWithEmailAndPassword(auth, email, password).then(res => {
                const user = res.user;
                console.log(user.displayName);
                addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name,
                    authProvider: "email",
                    email,
                }).then(() => {
                    addDoc(collection(db, "data"), {
                        uid: user.uid,
                        data: getData()
                    });
                });
        }).catch(err => {
            alert(err.message);
        })
    }

    return (
        <div className="register__container">
            {user ? (
                <p>{user.uid}</p>
            ) : loading ? (
                "Just a sec...."
            ) : error ? (
                "Some error occured"
            ) : (
                ""
            )}
            <form className="register__form flex flex-col">
                <h3 className="intro__greeting">Welcome, Buddy 👋</h3>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Enter Name..."
                    className="register__input"
                />
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter Email..."
                    className="register__input"
                />
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter Password..."
                    className="register__input"
                />
                <button
                    type="submit"
                    className="register__btn form__btn form__btn1 flex gap-3"
                    onClick={handleRegister}
                >
                    Register
                    <User />
                </button>
                <button className="register__btn__google form__btn flex gap-3 place-items-center" onClick={handleLoginWithGoogle}>
                    Sign up with Google
                    <FaGoogle />
                </button>
                <button className="toggle__auth text-sm mt-5" onClick={e => {
                    navigate("/login");
                }}>Already a member ?<br />Click here to Login!</button>
            </form>
        </div>
    );
};

export default Register;
