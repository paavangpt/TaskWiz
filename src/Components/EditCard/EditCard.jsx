import React, { useContext, useEffect, useRef, useState } from "react";
import { useCardEditing } from "../../store/store";
import "./EditCard.css";
import { motion } from "framer-motion";
import { TwitterPicker } from "react-color";
import { X } from "react-feather";
import AddCardChip from "../AddCard/AddCardChip";
import DataContext from "../../Contexts/DataContext";
import { updateData } from "../../Data/Firebase";

const backdropVariant = {
    initial: {
        opacity: 0,
    },
    animated: {
        opacity: 1,
    },
};

const EditCard = () => {
    const editing = useCardEditing((state) => state.editing);
    const cancelEditing = useCardEditing((state) => state.cancelEditing);
    const [tags, setTags] = useState([]);
    const addCardRef = useRef();
    const titleInputRef = useRef();
    const tagInputRef = useRef();
    const [activeTag, setActiveTag] = useState(0);
    const { data, setData, dataDocRef } = useContext(DataContext);

    console.log(editing);

    function handleOutsideEvent(event) {
        if (addCardRef) {
            if (event.keyCode) {
                console.log(event.keyCode);
                if (event.keyCode == 27) {
                    cancelEditing();
                }
            }
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleOutsideEvent);

        return () => {
            document.removeEventListener("keydown", handleOutsideEvent);
        };
    }, []);

    useEffect(() => {
        console.log(editing);
        if (editing.isEditing) {
            console.log("Came here!##############");
            titleInputRef.current.value = editing.card.title;
            setTags(editing.card.tags);
        }
    }, [editing]);

    function handleTagInput(event) {
        if (event.keyCode == 13) {
            if (!tagInputRef.current.value) {
                return;
            }
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

    function deleteTag(tag) {
        tags.splice(tags.indexOf(tag), 1);
        setTags([...tags]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        let title = titleInputRef.current.value;

        if (!title) {
            alert("Please enter a valid title");
            return;
        }

        const logger = console;
        logger.info("Came here! #1");
        const board = data.find((board) => board.id == editing.boardId);

        let cardIndex = 0;
        let currentCard;
        board.cards.forEach((card, index) => {
            if (card.id == editing.card.id) {
                currentCard = card;
                cardIndex = index;
            }
        });

        board.cards.splice(cardIndex, 1, {
            ...currentCard,
            title: titleInputRef.current.value,
            tags: tags,
        });

        logger.info("Updating Data...");
        setData([...data]);
        updateData(dataDocRef, [...data]);

        logger.info("Data Updated!");
        cancelEditing();
        // setInput("");
        // triggerActive();
    }

    function toggleEditingState(event) {
        if (addCardRef) {
            if (
                !event.target.classList.contains("edit__card__cancel__btn") &&
                !event.target.parentElement.classList.contains(
                    "edit__card__cancel__btn"
                )
            ) {
                console.log(addCardRef.current.parentNode);
                if (!addCardRef.current.contains(event.target)) {
                    cancelEditing();
                    return;
                }
            } else {
                cancelEditing();
            }
        }
    }

    return editing.isEditing ? (
        <motion.div
            variants={backdropVariant}
            initial="initial"
            animate="animated"
            exit={{
                opacity: 0,
                transition: {
                    when: "afterChildren",
                },
            }}
            transition={{
                duration: 0.2,
            }}
            className="edit__card__backdrop"
            onClick={toggleEditingState}
            key="edit-card"
        >
            <motion.form
                initial={{ scale: 0.2 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    animationTimingFunction: "ease-in-out",
                }}
                exit={{ scale: 0.2 }}
                transition={{
                    duration: 0.1,
                    type: "spring",
                    stiffness: 130,
                }}
                className="edit__card"
                onSubmit={handleSubmit}
                ref={addCardRef}
            >
                <input
                    ref={titleInputRef}
                    type="text"
                    className="edit__card__title__input"
                    placeholder="Enter Title..."
                    onKeyDown={handleTitleInput}
                />
                <input
                    ref={tagInputRef}
                    type="text"
                    className="edit__card__tag__input"
                    placeholder="Enter Tags"
                    onKeyDown={handleTagInput}
                />
                <div className="edit__card__tags flex flex-wrap gap-2">
                    {tags.length == 0 ? (
                        <span>Add some tags!</span>
                    ) : (
                        tags.map((tag, index) => {
                            return (
                                <AddCardChip
                                    deleteTag={deleteTag}
                                    index={index}
                                    isActive={index == activeTag}
                                    setActive={setActiveTag}
                                    padding={"10px"}
                                    fontSize={".8em"}
                                    key={index}
                                    data={tag}
                                />
                            );
                        })
                    )}
                    <br />
                    <div className="picker">
                        <TwitterPicker onChangeComplete={colorChangeHandler} />
                    </div>
                </div>
                <div className="edit__card__footer">
                    <button className="edit__card__btn" type="submit">
                        Save Card
                    </button>
                    <button
                        className="edit__card__cancel__btn"
                        onClick={toggleEditingState}
                    >
                        <X />
                    </button>
                </div>
            </motion.form>
        </motion.div>
    ) : (
        // <div className="edit-card__backdrop" onClick={cancelEditing}>
        //     <div className="edit-card">
        //         <input type="text" className="input title-input" />
        //         <input type="text" className="input tag-input" />
        //     </div>
        // </div>
        ""
    );
};

export default EditCard;
