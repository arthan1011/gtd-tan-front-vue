/**
 * Created by arthan on 18.07.2017.
 */

const express = require('express');
const app = express();
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Gtd-tan fake backend server started at port ${PORT}`);
});

app.get('/rest/task/daily', (req, res) => {
    res.json({
        tasks: createTasks(),
        dateLineItems: createDateLineItems(),
    })
});

function createTasks() {
    return [
        {
            "name": "Programming",
            "id": 1
        },
        {
            "name": "Japanese",
            "id": 2
        },
        {
            "name": "Sleeping",
            "id": 3
        }
    ]
}

function createDateLineItems() {
    let dates = createDates();
    let tasks = createTasks();
    return dates.map((date) => {
        let taskItems = tasks.map((task) => {
            return {
                id: task.id,
                completed: getRandomBoolean()
            }
        });
        let item = {
            date,
            tasks: taskItems
        };
        if (date.today) {
            item.today = true;
        }
        return item;
    })
}

function createDates() {
    const result = [];
    let now = new Date();
    let start = new Date();
    start.setDate(start.getDate() - 10);
    for (let i = 0; i < 21; i++) {
        let dateObject = {
            day: start.getDate(),
            month: start.getMonth() + 1,
            year: start.getFullYear(),
        };
        if (start.getTime() === now.getTime()) {
            dateObject.today = true;
        }
        result.push(dateObject);
        start.setDate(start.getDate() + 1);
    }
    return result;
}

function getRandomBoolean() {
    const rand = Math.random();
    if (rand <= 0.3) {
        return true;
    }
    if (rand >= 0.7) {
        return false;
    }
    return null;
}