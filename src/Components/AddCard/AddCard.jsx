import React, { useContext, useEffect, useRef, useState } from "react";
import { X } from "react-feather";
import DataContext from "../../Contexts/DataContext";
import Chip from "../Chip/Chip";
import "./AddCard.css";
import AddCardChip from "./AddCardChip";
import { SketchPicker, SliderPicker, TwitterPicker } from "react-color";

function AddCard(props) {
    const [tags, setTags] = useState([]);
    const addCardRef = useRef();
    const titleInputRef = useRef();
    const tagInputRef = useRef();
    const [activeTag, setActiveTag] = useState(null);

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
            if (
                !event.target.classList.contains("add__card__cancel__btn") &&
                !event.target.parentElement.classList.contains(
                    "add__card__cancel__btn"
                )
            ) {
                console.log(addCardRef.current.parentNode);
                if (!addCardRef.current.contains(event.target)) {
                    props.toggleEditingState(false);
                    return;
                }
            } else {
                props.toggleEditingState(false);
            }
        }
    }

    function handleTagInput(event) {
        if (event.keyCode == 13) {
            console.log("something something hello hunny bunny");
            event.preventDefault();
            setTags([
                ...tags,
                {
                    title: tagInputRef.current.value,
                    color: "#eee",
                },
            ]);
            tagInputRef.current.value = "";
            console.log(tags);
        }
    }

    function handleTitleInput(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            if (titleInputRef.current.value != "") tagInputRef.current.focus();
        }
    }

    function colorChangeHandler(color) {
        tags[activeTag].color = color.hex;
        console.log(color);
        setTags([...tags]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        let title = titleInputRef.current.value;
        let tagInput = tagInputRef.current.value;

        if(!title) {
            alert("Please enter a valid title");
            return;
        }

        const board = data.find((board) => board.id == props.boardId);
        board.cards.push({
            id: Date.now().toString(),
            title: title,
            date: new Date(),
            status: "On Going",
            tags: tags,
        });
        setData([...data]);

        props.toggleEditingState(false);

        console.log("Submit hua re baba!");
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
                    onKeyDown={handleTitleInput}
                />
                <input
                    ref={tagInputRef}
                    type="text"
                    className="add__card__tag__input"
                    placeholder="Enter Tags"
                    onKeyDown={handleTagInput}
                />
                <div className="add__card__tags flex flex-wrap gap-2">
                    {
                        tags.length == 0 ?
                        <span>Add some tags!</span> :
                        tags.map((tag, index) => {
                        return (
                            <AddCardChip
                                index={index}
                                isActive={index==activeTag}
                                setActive={setActiveTag}
                                padding={"10px"}
                                fontSize={".8em"}
                                key={index}
                                data={tag}
                            />
                        );
                    })
                }
                    <br />
                    <div className="picker">
                        <TwitterPicker onChangeComplete={colorChangeHandler} />
                    </div>
                </div>
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
