const express = require('express');
const cloneRepository = require('./download-files');
const convertTxt = require('./convertToTxt');

const app = express();

// Parse JSON in request body
app.use(express.json());

app.get('/downloadRepository', async (req, res) => {
    const queryParam1 = req.query.param;
    const res1 = await cloneRepository(queryParam1);
    convertTxt();

    res.json({ "users": ['userOne', 'userTwo'] });
});

app.post('/processInput', async (req, res) => {
    const input = req.body.input;
    console.log("🚀 ~ file: server.js:17 ~ app.post ~ input:", input);
  
    res.json({ response: 'response.text' });
  });

app.listen(5001, () => console.log("Server listening on port 5001"))