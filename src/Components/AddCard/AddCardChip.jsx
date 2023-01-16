import React from "react";
import "./AddCardChip.css";

function AddCardChip(props) {
    
    const tag = props.data;

    function onClickHandler() {
        console.log(props.index)
        props.setActive(props.index);
        console.log(props.isActive);
    }

    return (
        <div
            className={"add__card__chip " + (props.isActive ? "active__add__card__chip" : "") + " text-xs flex place-items-center"}
            onClick={onClickHandler}
            onDoubleClick={e => {
                const check = confirm("Are you sure you want to delete this tag?");
                if(check) {
                    props.deleteTag(tag);
                }
            }}
            style={{padding:props.padding || "1px 10px" , backgroundColor: tag.color || "#04e9f1", fontSize: props.fontSize || "0.65em" }}
        >
            {tag.title}
        </div>
    );
}

export default AddCardChip;
