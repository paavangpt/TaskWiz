import { useContext, useRef, useState } from "react";
import { MoreHorizontal } from "react-feather";
import DataContext from "../../Contexts/DataContext";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editable/Editable";
import DropZone from "../Dropzone/DropZone";
import "./Board.css";
import AddCard from "../AddCard/AddCard";

function Board(props) {
    const board = props.data;
    const boardTitleInput = useRef();

    const [showDropDown, setShowDropDown] = useState(false);
    const [editing, setEditing] = useState(false);
    const { data, setData } = useContext(DataContext);

    function toggleDropDown() {
        setShowDropDown(!showDropDown);
    }

    function deleteBoard() {
        const newData = data.filter((brd) => brd.id != board.id);
        setData(newData);
    }

    let changeBoardTitle = () => {
        props.functions.changeBoardTitle(
            board.id,
            boardTitleInput.current.textContent
        );
    };

    return (
        <div className="board" data-id={board.id}>
            {editing ? <AddCard boardId={board.id} toggleEditingState={setEditing}></AddCard> : ""}
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
            <div className="board__cards flex-1">
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
            </div>
            <div className="board__footer">
                <Editable
                    toggleEditingState={setEditing}
                    changeData={props.changeData}
                    boardId={board.id}
                />
            </div>
        </div>
    );
}

export default Board;
