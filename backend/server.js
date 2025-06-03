
// Just note that the example backend is not using 'await' therefore not using multi threading

// we should aim to use multi threading

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const resourceRoutes = require('./routes/resources');

const app = express();
const PORT = 3000;

app.use(cors()); //allows frontend on different port to connect
app.use(bodyParser.json()); // parses incoming JSON in request bodies

app.use('/api/resources', resourceRoutes); //all routes starting with /api/resources go here

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});