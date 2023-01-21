import React from "react";
import "./Modal.css";
import { motion } from "framer-motion";

function Modal(props) {
    return (
        <div className="modal">
            <div className="modal__content">{props.children}</div>
        </div>
    );
}

export default Modal;
