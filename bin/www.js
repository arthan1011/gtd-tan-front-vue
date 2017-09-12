/**
 * Created by arthan on 18.07.2017.
 */

const express = require('express');
const app = express();
const PORT = 4200;

app.use('/', express.static('dist'));


app.get('/hello', (req, res) => {
    res.send('Hello, expressJs!')
});


app.listen(PORT, () => {
    console.log(`Gtd-tan front end started at port ${PORT}`);
});