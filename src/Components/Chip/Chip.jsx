import React from "react";
import "./Chip.css";

function Chip(props) {
    
    const tag = props.data;

    return (
        <div
            className="chip text-xs flex place-items-center"
            style={{padding:props.padding || "1px 10px" , backgroundColor: tag.color || "#04e9f1", fontSize: props.fontSize || "0.65em" }}
        >
            {tag.title}
        </div>
    );
}

export default Chip;
