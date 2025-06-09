
// Just note that the example backend is not using 'await' therefore not using multi threading

// we should aim to use multi threading

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./config/db');

const resourceRouter = require('./routes/resources');
const forumRouter = require('./routes/forum');
const adoptionRouter = require('./routes/adoption');

const app = express();
const PORT = process.env.PORT || 3000;
const host = "localhost";

app.use(cors()); //allows frontend on different port to connect
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api/resources', resourceRouter); //all routes starting with /api/resources go here
app.use('/api/forum', forumRouter);
app.use('/adoption-posts', adoptionRouter);


const startServer = () => {
    db.connect((err) => {
        if (err) {
            console.error('Failed to connect to DB', err);
            process.exit(1);
        } else {
        console.log('Connected to DB');
        app.listen(PORT, () =>{
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    });
};

startServer();
