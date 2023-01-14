import React, { useContext, useEffect, useRef, useState } from "react";
import { X } from "react-feather";
import DataContext from "../../Contexts/DataContext";
import "./AddCard.css";

function AddCard(props) {
    const [tags, setTags] = useState([]);
    const addCardRef = useRef();
    const titleInputRef = useRef();
    const tagInputRef = useRef();

    function handleOutsideEvent(event) {
        if (addCardRef) {
            if (event.keyCode) {
                console.log(event.keyCode);
                if (event.keyCode == 27) {
                    props.toggleEditingState(false);
                }
            }
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleOutsideEvent);

        return () => {
            document.removeEventListener("keydown", handleOutsideEvent);
        };
    });

    const { data, setData } = useContext(DataContext);

    function toggleEditingState(event) {
        if (addCardRef) {
            if (!event.target.classList.contains("add__card__cancel__btn")) {
                if (!addCardRef.current.contains(event.target)) {
                    props.toggleEditingState(false);
                    return;
                }
            } else {
                props.toggleEditingState(false);
            }
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        let title = titleInputRef.current.value;
        let tagInput = tagInputRef.current.value;

        // const board = data.find((board) => board.id == props.boardId);
        // board.cards.push({
        //     id: Date.now().toString(),
        //     title: title,
        //     date: new Date(),
        //     status: "On Going",
        //     tags: tags,
        // });
        // setData([...data]);

        // console.log(input);
        // setInput("");
        // triggerActive();
    }

    return (
        <div className="add__card__backdrop" onClick={toggleEditingState}>
            <form
                className="add__card"
                onSubmit={handleSubmit}
                ref={addCardRef}
            >
                <input
                    ref={titleInputRef}
                    type="text"
                    className="add__card__title__input"
                    placeholder="Enter Title..."
                    // onSubmit={""}
                />
                <input
                    ref={tagInputRef}
                    type="text"
                    className="add__card__tag__input"
                    placeholder="Enter Tags"
                    // onSubmit={""}
                />
                <div className="add__card__tags"></div>
                <div className="add__card__footer">
                    <button className="add__card__btn" type="submit">
                        Add Card
                    </button>
                    <button
                        className="add__card__cancel__btn"
                        onClick={toggleEditingState}
                    >
                        <X />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCard;
