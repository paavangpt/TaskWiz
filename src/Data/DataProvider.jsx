const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const BOARDS_AND_CARDS = [
    {
        id: "board1",
        title: "Not Started",
        cards: [
            {
                id: "234514",
                title: "Write a blog",
                date: dateCreator(),
                tags: [
                    {
                        title: "Work",
                        color: "#fcb900",
                    },
                    {
                        title: "Learning",
                        color: "#f78da7",
                    },
                    {
                        title: "Blog",
                        color: "#8ed1fc",
                    },
                ],
            },
            {
                id: "4352345",
                title: "Make a youtube video",
                date: dateCreator(),
                                tags: [
                    {
                        title: "Work",
                        color: "#8ed1fc",
                    },
                    {
                        title: "Research",
                        color: "#f78da7",
                    },
                ],
            },
        ],
    },
    {
        id: "board2",
        title: "On Going",
        cards: [
            {
                id: "1452435",
                title: "Learn to Play Guitar",
                date: dateCreator(),
                                tags: [
                    {
                        title: "Learning",
                        color: "#f78da7",
                    },
                ],
            },
        ],
    },
    {
        id: "baord3",
        title: "Completed",
        cards: [
            {
                id: "66789",
                title: "Submit Leave Application",
                date: dateCreator(),
                                tags: [
                    {
                        title: "Work",
                        color: "#f78da7",
                    },
                    {
                        title: "Life",
                        color: "#8ed1fc",
                    },
                ],
            },
            {
                id: "57865",
                title: "Play Badminton 🏸",
                date: dateCreator(),
                                tags: [
                    {
                        title: "Sports",
                        color: "#f78da7",
                    },
                    {
                        title: "Health",
                        color: "#8ed1fc",
                    },
                    {
                        title: "Workout",
                        color: "#fcb900",
                    },
                ],
            },
            {
                id: "896895",
                title: "Complete a book",
                date: dateCreator(),
                                tags: [
                    {
                        title: "Learning",
                        color: "#fcb900",
                    },
                    {
                        title: "Life",
                        color: "#fcb900",
                    },
                ],
            },
            // {
            //     id: "896895",
            //     title: "Learn River Flows in You",
            //     date: new Date(),
            //                 //     tags: [
            //         "Work"
            //     ]
            // },
            // {
            //     id: "896895",
            //     title: "Learn River Flows in You",
            //     date: new Date(),
            //                 //     tags: [
            //         "Work"
            //     ]
            // }
        ],
    },
];

export function getData() {
    return BOARDS_AND_CARDS;
}

export function dateCreator() {
    const date = new Date();
    return (date.getDate() + " " + months[date.getMonth()]).toString();
}
