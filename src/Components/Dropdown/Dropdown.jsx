import React from "react";
import { useRef, useEffect } from "react";
import './Dropdown.css';

function Dropdown(props) {

    const dropDownRef = useRef();
    let enabled = false;
    console.log( "Ref value is : " + dropDownRef.current);

    const dropDownClicked = function () {
        if(props.onClick) {
            props.onClick();
        }
        if(props.onClose) {
            props.onClose();
        }
    }

    const handleClick = function (event) {
        if(dropDownRef.current != undefined && !dropDownRef.current.contains(event.target) && enabled == true) {
            if (props.onClose) {
                props.onClose();
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            enabled = true;
        }, 100)
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });

    return <div ref={dropDownRef} onClick={dropDownClicked} className="dropdown">{props.children}</div>;
}

export default Dropdown;
