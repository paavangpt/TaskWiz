import React from "react";
import { useRef } from "react";

function DropZone() {

    const dropzone = useRef();

    function handleDragEnter() {
        dropzone.current.classList.add(".active__dropzone");
    }

    function handleDragExit() {
        dropzone.current.classList.remove(".active__dropzone");
    }

    return <div ref={dropzone} className="dropzone" onDragEnter={handleDragEnter} onDragExit={handleDragExit} ></div>;
}

export default DropZone;
