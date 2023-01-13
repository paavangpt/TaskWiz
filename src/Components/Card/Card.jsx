import React, { useContext, useState } from "react";
import { MoreHorizontal, Clock } from "react-feather";
import Chip from "../Chip/Chip";
import "./Card.css";
import { dateCreator } from "../../Data/DataProvider";
import DataContext from "../../Contexts/DataContext";
import Dropdown from "../Dropdown/Dropdown";

function Card(props) {

    const [showDropDown, setShowDropDown] = useState(false);
    const { data, setData } = useContext(DataContext);
    const card = props.data;

    function toggleDropDown() {
        setShowDropDown(!showDropDown);
    }
    
    function deleteCard() {
        const board = data.find(board => board.id == props.boardId);
        // data.forEach((brd, index) => {
        //     if(brd.id == props.boardId){
        //         board = brd
        //     }
        // })
        board.cards = board.cards.filter(crd => crd.id != card.id);
        setData([...data]);
    }

    function dragStarted(event) {
        event.dataTransfer.setData("text/plain", JSON.stringify(card));
    }

    return (
        <div className="card flex-col gap-4 p-2 mb-1 bg-white rounded-md cursor-pointer shadow-lg" draggable="true" onDragStart={dragStarted}>
            <div className="card__top flex justify-between">
                <div className="tags flex flex-wrap gap-1">
                    {card.tags.map((tag, index) => {
                        return <Chip key={card.id + index} data={tag} />;
                    })}
                </div>
                <div className="card__top__more__btn relative" >
                    <MoreHorizontal onClick={toggleDropDown} />
                    {showDropDown ? (
                        <Dropdown onClose={toggleDropDown} onClick={deleteCard}>
                            <p>Delete Card</p>
                        </Dropdown>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div className="card__content">
                <p className="card__content__title">{card.title}</p>
            </div>
            <div className="card__bottom">
                <span className="card__date flex place-items-center gap-2 text-xs bg-gray-200 w-fit px-4 py-1 rounded-xl">
                    <Clock className="w-3 h-3"/>
                    {dateCreator(card.date)}
                </span>
            </div>
        </div>
    );
}

export default Card;
