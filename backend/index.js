const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;
const cors = require('cors');

const routes = require('./src/routes');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, async function () {
    console.log(`backend is running on port ${port}.`);
});


