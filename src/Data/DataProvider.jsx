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
                status: "On Going",
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
                        title: "Span",
                        color: "#8ed1fc",
                    },
                ],
            },
            {
                id: "4352345",
                title: "Make a youtube video",
                date: dateCreator(),
                status: "On Going",
                tags: [
                    {
                        title: "Learning",
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
                title: "Learn ReactJS",
                date: dateCreator(),
                status: "On Going",
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
                title: "Spring Boot",
                date: dateCreator(),
                status: "On Going",
                tags: [
                    {
                        title: "Work",
                        color: "#f78da7",
                    },
                    {
                        title: "Learning",
                        color: "#8ed1fc",
                    },
                ],
            },
            {
                id: "57865",
                title: "Learn SQL Database",
                date: dateCreator(),
                status: "On Going",
                tags: [
                    {
                        title: "Work",
                        color: "#f78da7",
                    },
                    {
                        title: "Learning",
                        color: "#8ed1fc",
                    },
                    {
                        title: "Learning",
                        color: "#fcb900",
                    },
                ],
            },
            {
                id: "896895",
                title: "Learn River Flows in You",
                date: dateCreator(),
                status: "On Going",
                tags: [
                    {
                        title: "Learning",
                        color: "#fcb900",
                    },
                ],
            },
            // {
            //     id: "896895",
            //     title: "Learn River Flows in You",
            //     date: new Date(),
            //     status: "On Going",
            //     tags: [
            //         "Work"
            //     ]
            // },
            // {
            //     id: "896895",
            //     title: "Learn River Flows in You",
            //     date: new Date(),
            //     status: "On Going",
            //     tags: [
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
