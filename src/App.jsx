import { signOut } from "firebase/auth";
import { updateDoc } from "firebase/firestore";
import { createContext } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import "./App.css";
import AddCard from "./Components/AddCard/AddCard";
import Board from "./Components/Board/Board";
import DataContext from "./Contexts/DataContext";
import { getData } from "./Data/DataProvider";
import { auth, loadData, loadUserData, updateData } from "./Data/Firebase";

function App() {
    const [data, setData] = useState([]);
    const [dataDocRef, setDataDocRef] = useState();
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Use effect Triggered!");
        if (!user && !loading) {
            navigate("/login");
        }
        if (user) {
            loadUserData(user.uid)
                .then((res) => {
                    const uData = res.docs;
                    console.log(uData);
                    setUserData(uData);
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
        setData([
            ...data,
            {
                id: "board" + (data.length + 1),
                title: "New Board",
                cards: [],
            },
        ]);
        updateData(dataDocRef, [...data]);
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

    if (user) {
        return (
            <DataContext.Provider value={{  data, setData, dataDocRef }}>
                <div className="app">
                    <div className="app__navbar">
                        <span id="title">TaskWiz</span>
                        <div className="app__navbar__end">
                            {user && (
                                <button
                                    className="nav__sign__out__btn"
                                    onClick={(e) => {
                                        signOut(auth);
                                        localStorage.clear();
                                    }}
                                >
                                    Sign Out
                                </button>
                            )}
                            <button
                                className="add__board__btn"
                                onClick={addNewBoard}
                            >
                                Add Board
                            </button>
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
                            <div className="app__boards">
                                {data.map((board) => {
                                    return (
                                        <Board
                                            functions={{ changeBoardTitle }}
                                            key={board.id}
                                            data={board}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </DataContext.Provider>
        );
    } else if (loading) {
        return "Please Wait...";
    } else {
        return "Plesae Sign In!";
    }
}

export default App;
