import React, { useContext, useState } from "react";
import { X } from "react-feather";
import  DataContext from "../../Contexts/DataContext";
import "./Editable.css";

function Editable(props) {
    const [active, setActive] = useState(false);
    const [input, setInput] = useState("");

    const { data, setData } = useContext(DataContext);

    function updateInput(event) {
        setInput(event.target.value);
    }

    function triggerActive(event) {
        setActive(!active);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const board = data.find(board => board.id == props.boardId);
        board.cards.push({
            id: Date.now().toString(),
            title: input,
            date: new Date(),
            status: "On Going",
            tags: [
                // {
                //     title: "Work",
                //     color: "cyan",
                // },
            ],
        });
        setData([...data]);

        console.log(input);
        setInput("");
        triggerActive();
    }

    const toggleEditingState = () => props.toggleEditingState(true);

    return active ? (
        <div className="editable">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Title..." className="editable__input p-2 rounded-md shadow-sm" onChange={updateInput} value={input}/>
                <div className="editable__bottom flex gap-2 cursor-pointer py-2 w-min h-min">
                    <button type="submit" className="bg-blue-400 text-white px-4 py-1 rounded-md shadow-md">Add</button>
                    <div className="editable__svg__container rounded-md shadow-md" onClick={triggerActive} >
                        <X />
                    </div>
                </div>
            </form>
        </div>
    ) : (
        <button
            className="bg-white py-2 w-full rounded-md shadow-lg cursor-pointer transition duration-300 hover:scale-105"
            onClick={toggleEditingState}
        >
            Add +
        </button>
    );
}

export default Editable;
