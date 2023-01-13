import { useContext, useRef, useState } from "react";
import { MoreHorizontal } from "react-feather";
import DataContext from "../../Contexts/DataContext";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editable/Editable";
import "./Board.css";

function Board(props) {
    const board = props.data;
    const boardTitleInput = useRef();

    const [showDropDown, setShowDropDown] = useState(false);
    const { data, setData } = useContext(DataContext);

    function toggleDropDown() {
        setShowDropDown(!showDropDown);
    }
    
    function deleteBoard() {
        const newData = data.filter(brd => brd.id != board.id);
        setData(newData);
    }

    let changeBoardTitle = () => {
        props.functions.changeBoardTitle(
            board.id,
            boardTitleInput.current.textContent
        );
    };

    return (
        <div className="board">
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
                <div className="board__top__more__btn" >
                    <MoreHorizontal onClick={toggleDropDown} />
                    {showDropDown ? (
                        <Dropdown onClose={toggleDropDown} onClick={deleteBoard}>
                            <p>Delete Board</p>
                        </Dropdown>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div className="board__cards flex-1">
                {board.cards.map((card) => {
                    return <Card key={card.id} boardId={board.id} data={card}></Card>;
                })}
            </div>
            <div className="board__footer">
                <Editable changeData={props.changeData} boardId={board.id} />
            </div>
        </div>
    );
}

export default Board;
