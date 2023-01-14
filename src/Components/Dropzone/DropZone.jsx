import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import DataContext from "../../Contexts/DataContext";
import { dateCreator } from "../../Data/DataProvider";
import "./DropZone.css";

function DropZone(props) {
    const { data, setData } = useContext(DataContext);
    const activeDropzoneClass = props.full ? "active__full__dropzone" : "active__dropzone";

    const dropzone = useRef();

    function handleDragEnter() {
        dropzone.current.classList.add(activeDropzoneClass);
    }

    function handleDragExit() {
        dropzone.current.classList.remove(activeDropzoneClass);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        dropzone.current.classList.remove(activeDropzoneClass);
        const cardData = JSON.parse(event.dataTransfer.getData("text/plain"));
        cardData.date = new Date(cardData.date);
        
        
        const targetBoardId = dropzone.current.closest(".board").dataset.id;
        const targetBoard = data.find(board => board.id == targetBoardId);
        const sourceBoard = data.find(board => board.id == cardData.sourceBoardId);
        
        if(sourceBoard.id == targetBoard.id) {
            targetBoard.cards = targetBoard.cards.filter(crd => crd.id != cardData.id);
            targetBoard.cards.splice(props.index, 0, cardData);
            console.log("Same same : ");
            console.log(data);
            return;
        }
        
        sourceBoard.cards = sourceBoard.cards.filter(crd => crd.id != cardData.id);
        targetBoard.cards.splice(props.index, 0, cardData);
        setData([...data]);

    }

    return (
        <div
            ref={dropzone}
            className= {props.full ? "full__dropzone" : "dropzone"}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragExit={handleDragExit}
            onDrop={handleDrop}
        >

        </div>
    );
}

export default DropZone;
