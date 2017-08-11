/**
 * Created by arthan on 18.07.2017.
 */

const express = require('express');
const app = express();
const PORT = 3001;

app.get('/rest/task/daily', (req, res) => {
    let meta = {
        dates: createDates()
    };
    res.json({
        meta,
        tasks: createTasksDateLine()
    });
});

app.listen(PORT, () => {
    console.log(`Gtd-tan fake backend server started at port ${PORT}`);
});

function createDates() {
    const result = [];
    let now = new Date();
    for (let i = 0; i < 21; i++) {
        result.push({
            day: now.getDate(),
            month: now.getMonth() + 1,
            year: now.getFullYear(),
        });
        now.setDate(now.getDate() + 1);
    }
    return result;
}

function createTasksDateLine() {
    let tasks = ["Abstraction 2", "Inspiration 1", "Polymorphism 2"];
    return tasks.map((task) => {
        let items = createDates().map((date) => {
            return {
                date,
                complete: getRandomBoolean()
            }
        });
        return {
            name: task,
            datelineItems: items
        };
    })
}

function getRandomBoolean() {
    return Math.random() >= 0.5;
}