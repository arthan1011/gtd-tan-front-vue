/**
 * Created by arthan on 18.07.2017.
 */

const express = require('express');
const app = express();
const PORT = 3001;

app.get('/rest/task/daily', (req, res) => {
    res.json([
        {
            name: "Abstraction 2",
            datelineItems: [
                1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0
            ],
        },
        {
            name: "Inauguration 3",
            datelineItems: [
                1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0
            ],
        },
        {
            name: "Polymorphism 2",
            datelineItems: [
                1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0
            ],
        }
    ]);
});

app.listen(PORT, () => {
    console.log(`Gtd-tan fake backend server started at port ${PORT}`);
});