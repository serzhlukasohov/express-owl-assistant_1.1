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
      const cloningResult = await cloneRepository(repositoryUrl, repositoryName);
      console.log('cloningResult', cloningResult);
      if (cloningResult === true) {
        await convertTxt(repositoryName);
        res.json({ "status": "project downloaded and parsed" }); 
      } else {
        res.json({ "status": "wrong git address" }); 
      }
    } else {
      res.json({ "status": "repository already exist and parsed" });
    }
});

app.post('/processInput', async (req, res) => {
    const input = req.body.input;
    console.log("🚀 ~ file: server.js:17 ~ app.post ~ input:", input);
  
    res.json({ response: 'response.text' });
  });

app.post('/getPromtResult', async (req, res) => {
  const repositoryName = req.body.git.split('/').at(-1);
  const prompt = req.body.prompt;
  
  console.log(repositoryName, prompt);
  fs.access('result.txt', fs.constants.F_OK, (err) => {
    if (err) {
      res.json({ pending: 'no result yet' });
      return;
    }
  
    fs.readFile('result.txt', 'utf-8', (err, data) => {
      if (err) {
        res.json({ pending: 'no result yet' });
        return;
      }  
      
      res.json({ success: data });
    });
  });
});

app.listen(5001, () => console.log("Server listening on port 5001"))