const BOARDS_AND_CARDS = [
    {
        id: "board1",
        title: "Not Started",
        cards: [
            {
                id: "234514",
                title: "Write a blog",
                date: new Date(),
                status: "On Going",
                tags: [
                    {
                        title: "Work",
                        color: "cyan",
                    },
                    {
                        title: "Learning",
                        color: "blueviolet",
                    },
                    {
                        title: "Span",
                        color: "yellow",
                    },
                ],
            },
            {
                id: "4352345",
                title: "Make a youtube video",
                date: new Date(),
                status: "On Going",
                tags: [
                    {
                        title: "Learning",
                        color: "blueviolet",
                    },
                    {
                        title: "Research",
                        color: "pink",
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
                date: new Date(),
                status: "On Going",
                tags: [
                    {
                        title: "Learning",
                        color: "blueviolet",
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
                date: new Date(),
                status: "On Going",
                tags: [
                    {
                        title: "Work",
                        color: "cyan",
                    },
                    {
                        title: "Learning",
                        color: "blueviolet",
                    },
                ],
            },
            {
                id: "57865",
                title: "Learn SQL Database",
                date: new Date(),
                status: "On Going",
                tags: [
                    {
                        title: "Work",
                        color: "cyan",
                    },
                    {
                        title: "Learning",
                        color: "blueviolet",
                    },
                    {
                        title: "Learning",
                        color: "pink",
                    },
                ],
            },
            {
                id: "896895",
                title: "Learn River Flows in You",
                date: new Date(),
                status: "On Going",
                tags: [
                    {
                        title: "Learning",
                        color: "cyan",
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

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function dateCreator(date) {
    return date.getDate() +  " " + months[date.getMonth()];
}
