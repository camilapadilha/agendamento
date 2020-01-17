const routes = require('./src/routes');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;
const cors = require('cors');

const controller = require('./src/controller/controller');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, async function () {
    console.log(`backend is running on port ${port}.`);
    const a = await controller.buscar();
    console.log('a - ', a);
    
});

module.exports = app;

