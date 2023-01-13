import React from "react";
import "./Chip.css";

function Chip(props) {
    
    const tag = props.data;

    return (
        <div
            className="chip text-xs rounded-xl flex place-items-center"
            style={{ backgroundColor: tag.color || "#04e9f1" }}
        >
            {tag.title}
        </div>
    );
}

export default Chip;
