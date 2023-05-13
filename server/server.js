const express = require('express');
const cloneRepository = require('./download-files');
const convertTxt = require('./convertToTxt');
const fs = require('fs');

const app = express();

// Parse JSON in request body
app.use(express.json());

app.get('/downloadRepository', async (req, res) => {
    const repositoryUrl = req.query.param;
    const repositoryName = repositoryUrl.split('/').at(-1);
    if (!fs.existsSync(`./projects/${repositoryName}`)) {
      await cloneRepository(repositoryUrl, repositoryName);
      await convertTxt(repositoryName);
      res.json({ "status": "repository downloaded and parsed" });
    } else {
      res.json({ "status": "repository already exist and parsed" });
    }
});

app.post('/processInput', async (req, res) => {
    const input = req.body.input;
    console.log("🚀 ~ file: server.js:17 ~ app.post ~ input:", input);
  
    res.json({ response: 'response.text' });
  });

app.listen(5001, () => console.log("Server listening on port 5001"))