import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import DataContext from "../../Contexts/DataContext";
import { dateCreator } from "../../Data/DataProvider";
import { updateData } from "../../Data/Firebase";
import "./DropZone.css";

function DropZone(props) {
    const { data, setData, dataDocRef } = useContext(DataContext);
    const activeDropzoneClass = props.full ? "active__full__dropzone" : "active__dropzone";

    const dropzone = useRef();
    console.log(" is full : " + props.full);

    function handleDragEnter() {
        console.log("Entered");
        dropzone.current.classList.add(activeDropzoneClass);
    }

    function handleDragExit() {
        console.log("Exited");
        dropzone.current.classList.remove(activeDropzoneClass);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        dropzone.current.classList.remove(activeDropzoneClass);
        const cardData = JSON.parse(event.dataTransfer.getData("text/plain"));
        
        
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
        delete cardData.sourceBoardId;
        targetBoard.cards.splice(props.index, 0, cardData);
        setData([...data]);
        updateData(dataDocRef, [...data]);

    }

    return (
        <div
            ref={dropzone}
            className= {props.full ? "full__dropzone" : "dropzone"}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragExit}
            onDrop={handleDrop}
        >

        </div>
    );
}

export default DropZone;
