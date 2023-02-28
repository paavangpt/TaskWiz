import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Power } from "react-feather";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import "./App.css";
import Board from "./Components/Board/Board";
import EditCard from "./Components/EditCard/EditCard";
import Modal from "./Components/Modal/Modal";
import SignOutConfirmationModal from "./Components/SignOutConfirmationModal/SignOutConfirmationModal";
import DataContext from "./Contexts/DataContext";
import { auth, loadData, loadUserData, updateData } from "./Data/Firebase";
import useWindowDimensions from "./hooks/useWindowDimensions";

function App() {
    const [data, setData] = useState([]);
    const [dataDocRef, setDataDocRef] = useState();
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    const windowDimensions = useWindowDimensions();

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

    const handleDragEnd = (result) => {
        console.log(result);
        // dropzone.current.classList.remove(activeDropzoneClass);
        // const cardData = JSON.parse(event.dataTransfer.getData("text/plain"));

        // const targetBoardId = dropzone.current.closest(".board").dataset.id;
        const targetBoard = data.find(
            (board) => board.id == result.destination.droppableId
        );
        const sourceBoard = data.find(
            (board) => board.id == result.source.droppableId
        );
        console.log(sourceBoard);

        // if(sourceBoard.id == targetBoard.id) {
        //     targetBoard.cards = targetBoard.cards.filter(crd => crd.id != cardData.id);
        //     targetBoard.cards.splice(props.index, 0, cardData);
        //     console.log("Same same : ");
        //     console.log(data);
        //     return;
        // }

        const card = sourceBoard.cards.filter(
            (crd) => crd.id == parseInt(result.draggableId)
        )[0];
        sourceBoard.cards = sourceBoard.cards.filter(
            (crd) => crd.id != parseInt(result.draggableId)
        );
        targetBoard.cards.splice(result.destination.index, 0, card);
        setData([...data]);
        updateData(dataDocRef, [...data]);
    };

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
            windowDimensions.width <= 400 
            ?
                <div className="mobile-not-supported-container">
                
                    <div className="mobile-not-supported-content">
                        <h3>Hey There! 👋<br />What's up? 😄</h3>
                        <p>We're really sorry to inform you that we don't currently support mobile phones. 
                        <br />
                        Please open in a bigger screen for a great experience.</p>
                    </div>

                </div>
            :
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
                        <AnimatePresence>
                            <EditCard />
                        </AnimatePresence>
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
                                <DragDropContext onDragEnd={handleDragEnd}>
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
                                                    key={board.id + ""}
                                                    variants={boardVariants}
                                                >
                                                    <Board
                                                        functions={{
                                                            changeBoardTitle,
                                                        }}
                                                        key={board.id + ""}
                                                        data={board}
                                                        index={index}
                                                    />
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>
                                </DragDropContext>
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
