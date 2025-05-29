
// Just note that the example backend is not using 'await' therefore not using multi threading

// we should aim to use multi threading

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
