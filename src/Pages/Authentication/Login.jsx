import React, { useEffect, useState } from "react";
import "./Login.css";
import { auth, db, signInWithGoogle } from "../../Data/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getData } from "../../Data/DataProvider";
import { FaGoogle, FaSignInAlt } from 'react-icons/fa';
import { LogIn } from "react-feather";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [user, setUser] = useState();
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    // signOut(auth);

    const handleLoginWithEmailAndPassword = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((res) => {
            const usr = res.user;
            if(!usr) {
                alert("Not signed in Please try again.");
                return;
            }
            navigate("/app");
        })
    }

    const handleLogin = (e) => {
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

    useEffect(() => {
        if (!user) {
            return;
        }
        navigate("/app");
    }, [user, loading]);

    return (
        <div className="login__container">
            {user ? (
                <p>{user.uid}</p>
            ) : loading ? (
                "Just a sec...."
            ) : error ? (
                "Some error occured"
            ) : (
                ""
            )}
            <form className="login__form flex flex-col">
                <h3 className="intro__greeting">Welcome, Buddy 👋</h3>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter Email..."
                    className="login__input"
                />
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter Password..."
                    className="login__input"
                />
                <button
                    type="submit"
                    className="login__btn form__btn form__btn1 flex gap-3"
                    onClick={handleLoginWithEmailAndPassword}
                >
                    Login
                    <FaSignInAlt />
                </button>
                <button className="login__btn__google form__btn flex gap-3 place-items-center" onClick={handleLogin}>
                    Sign in with Google
                    <FaGoogle/>
                </button>
                <button className="toggle__auth text-sm mt-5" onClick={e => {
                    navigate("/register");
                }}>New Task Wizard ?<br />Click here to Register!</button>
            </form>
        </div>
    );
};

export default Login;
