import { createContext } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import "./App.css";
import Board from "./Components/Board/Board";
import DataContext from "./Contexts/DataContext";
import { getData } from "./Data/DataProvider";

function App() {
    const [data, setData] = useState(getData());

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
                id: data.length + 1,
                title: "New Board",
                cards: [],
            },
        ]);
    }

    function changeBoardTitle(boardId, title) {
        const board = data.find((board) => board.id == boardId);
        board.title = title;
        console.log(data);
        setData([...data]);
    }

    return (
        <DataContext.Provider value={{ data, setData }}>
            <div className="app">
                <div className="app__navbar">
                    <span id="title">TaskWiz</span>
                    <button className="add__board__btn" onClick={addNewBoard}>
                        Add Board
                    </button>
                </div>
                <div className="app__content">
                    {data.length == 0 ? (
                        <div className="empty__kanban__message">
                            No Boards To Display. <br />
                            Just create a new one to continue!
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
}

export default App;
