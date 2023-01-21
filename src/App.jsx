import { signOut } from "firebase/auth";
import { updateDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { createContext, useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Power } from "react-feather";
import { useAuthState } from "react-firebase-hooks/auth";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import "./App.css";
import AddCard from "./Components/AddCard/AddCard";
import Board from "./Components/Board/Board";
import Modal from "./Components/Modal/Modal";
import SignOutConfirmationModal from "./Components/SignOutConfirmationModal/SignOutConfirmationModal";
import DataContext from "./Contexts/DataContext";
import { getData } from "./Data/DataProvider";
import { auth, loadData, loadUserData, updateData } from "./Data/Firebase";

function App() {
    const [data, setData] = useState([]);
    const [dataDocRef, setDataDocRef] = useState();
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    const [isSigningOut, setIsSigningOut] = useState(false);

    const appBoardVariants = {
        animated: {
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.06,
            },
        },
    };

    const boardVariants = {
        initial: {
            opacity: 0,
            scale: 0.9,
        },
        animated: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.6,
                type: "spring",
            },
        },
    };

    useEffect(() => {
        console.log("Use effect Triggered!");
        if (!user && !loading) {
            navigate("/");
        }
        if (user) {
            loadUserData(user.uid).then((res) => {
                console.log("Loading user data");
                const uData = res.docs[0];
                setUserData(uData.data());
                loadData(user.uid).then((res) => {
                    const resData = res.docs;
                    console.log(resData[0].data().data);
                    setDataDocRef(resData[0].id);
                    // setData(getData().splice(0,2));
                    setData([...resData[0].data().data]);
                    // setDataDocRef(resData[0].)
                });
            });
        }
        // loadData().then(data => {
        //     setData(data);
        // });
    }, [user, loading]);

    // function changeData(card, boardId) {
    //     console.log(board);
    //     board.cards.push(card);
    //     console.log(data);
    //     something = !something;
    //     setData([...data]);
    // }

    function addNewBoard() {
        const boardId = uuid();
        updateData(dataDocRef, [
            ...data,
            {
                id: boardId,
                title: "New Board",
                cards: [],
            },
        ]);
        setData([
            ...data,
            {
                id: boardId,
                title: "New Board",
                cards: [],
            },
        ]);
        console.log([...data]);
    }

    // useEffect(() => {
    //     if(data) {
    // updateData(dataDocRef, [...data]);
    //     }
    // }, [data]);

    function changeBoardTitle(boardId, title) {
        const board = data.find((board) => board.id == boardId);
        board.title = title;
        console.log(data);
        setData([...data]);
        updateData(dataDocRef, [...data]);
    }
    
    // const boardVariants = {
    //     initial: {
    //         opacity: 0,
    //         scale: 0.9,
    //     },
    //     animated: {
    //         scale: 1,
    //         opacity: 1,
    //         transition: {
    //             duration: 0.6,
    //             type: "spring",
    //         },
    //     },
    // };

    if (user) {
        return (
            <DataContext.Provider value={{ data, setData, dataDocRef }}>
                {isSigningOut && (
                    <Modal>
                        <SignOutConfirmationModal
                            setIsSigningOut={setIsSigningOut}
                        />
                    </Modal>
                )}
                <AnimatePresence>
                    <div className="app">
                        <div className="app__navbar">
                            <span id="title">TaskWiz</span>
                            <div className="app__navbar__end">
                                {user && userData && (
                                    <span className="wish__user flex place-items-center">
                                        Hello 👋, {userData.name}
                                    </span>
                                )}
                                {user && (
                                    <button
                                        className="nav__sign__out__btn flex gap-2"
                                        onClick={(e) => {
                                            setIsSigningOut(true);
                                            localStorage.clear();
                                        }}
                                    >
                                        Sign Out
                                        <Power
                                            width={15}
                                            className="flex place-items-center"
                                        />
                                    </button>
                                )}
                                <motion.button
                                    whileTap={{ scale: 0.3 }}
                                    className="add__board__btn"
                                    onClick={addNewBoard}
                                >
                                    Add Board +
                                </motion.button>
                            </div>
                        </div>
                        <div className="app__content">
                            {data.length == 0 ? (
                                <div className="empty__kanban__message">
                                    <p>
                                        No Boards To Display. <br />
                                        Just create a new one to continue!
                                    </p>
                                </div>
                            ) : (
                                <motion.div
                                    variants={appBoardVariants}
                                    initial="initial"
                                    animate="animated"
                                    className="app__boards"
                                >
                                        {data.map((board, index) => {
                                            return (
                                                <motion.div
                                                style={{
                                                    minHeight: "100%",
                                                }}
                                                key={board.id}
                                                variants={boardVariants}>
                                                    <Board
                                                        functions={{
                                                            changeBoardTitle,
                                                        }}
                                                        key={board.id}
                                                        data={board}
                                                        index={index}
                                                    />
                                                </motion.div>
                                            );
                                        })}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </AnimatePresence>
            </DataContext.Provider>
        );
    } else if (loading) {
        return "Please Wait...";
    } else {
        return "Plesae Sign In!";
    }
}

export default App;
