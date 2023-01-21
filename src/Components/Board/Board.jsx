import { useContext, useRef, useState } from "react";
import { MoreHorizontal } from "react-feather";
import DataContext from "../../Contexts/DataContext";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editable/Editable";
import DropZone from "../Dropzone/DropZone";
import "./Board.css";
import AddCard from "../AddCard/AddCard";
import { updateData } from "../../Data/Firebase";
import { motion, AnimatePresence, animate } from "framer-motion";

function Board(props) {
    const board = props.data;
    const boardTitleInput = useRef();

    console.log(board.id);

    const [showDropDown, setShowDropDown] = useState(false);
    const [editing, setEditing] = useState(false);
    const { data, setData, dataDocRef } = useContext(DataContext);

    function toggleDropDown() {
        setShowDropDown(!showDropDown);
    }

    function deleteBoard() {
        const newData = data.filter((brd) => brd.id != board.id);
        setData(newData);
        updateData(dataDocRef, newData);
    }

    let changeBoardTitle = () => {
        props.functions.changeBoardTitle(
            board.id,
            boardTitleInput.current.textContent
        );
    };

    // Variants
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
    

    return (
        <motion.div
            style={{
                zIndex: editing ? 30 : 10,
            }}
            key={props.key}
            // ----------------- Scale -------------------
            // initial={{ scaleX: 0, opacity: 0, transformOrigin: "left" }}
            // animate={{ scaleX: 1, opacity: 1 }}
            // exit={{ scaleX: 0, opacity: 0 }}

            // ----------------- Opacity -------------------
            // variants={boardVariants}
            // exit={{
            //     scale: 0.9,
            //     opacity: 0,
            // }}
            // ----------------- Top to down fall -------------------
            // initial={{ translateY: "-100vh", opacity: 0 }}
            // animate={{ translateY: "0vh", opacity: 1 }}
            // exit={{ translateY: "-100vh", opacity: 0 }}

            className="board"
            data-id={board.id}
        >
            {editing ? (
                <AddCard
                    boardId={board.id}
                    toggleEditingState={setEditing}
                ></AddCard>
            ) : (
                ""
            )}
            <div className="board__top relative">
                <h2 className="board__title">
                    <span
                        ref={boardTitleInput}
                        className="board__title__text"
                        suppressContentEditableWarning={true}
                        contentEditable
                        onBlur={changeBoardTitle}
                    >
                        {board.title}
                    </span>
                    <span className="board__card__count">
                        {board.cards.length}
                    </span>
                </h2>
                <div className="board__top__more__btn">
                    <MoreHorizontal onClick={toggleDropDown} />
                    {showDropDown ? (
                        <Dropdown
                            onClose={toggleDropDown}
                            onClick={deleteBoard}
                        >
                            <p>Delete Board</p>
                        </Dropdown>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <motion.div className="board__cards flex-1" layout>
                {board.cards.length == 0 ? (
                    <DropZone
                        full={true}
                        index={0}
                        key={board.id + "dbz"}
                    ></DropZone>
                ) : (
                    <DropZone index={0} key={board.id + "dbz"}></DropZone>
                )}
                {board.cards.map((card, index) => {
                    return (
                        <div className="card__container" key={card.id}>
                            <Card boardId={board.id} data={card}></Card>
                            <DropZone
                                full={
                                    index == board.cards.length - 1
                                        ? true
                                        : false
                                }
                                index={index + 1}
                                key={card.id + "dbz"}
                            ></DropZone>
                        </div>
                    );
                })}
            </motion.div>
            <div className="board__footer">
                <Editable
                    toggleEditingState={setEditing}
                    changeData={props.changeData}
                    boardId={board.id}
                />
            </div>
        </motion.div>
    );
}

export default Board;
