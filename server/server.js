// const { processInput } = require('./chat');
import express from 'express';
import { cloneRepository } from './download-files.js';
import { convertTxt } from './convertToTxt.js';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

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
      convertTxt(repositoryName);
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
  const repositoryName = req.body.gitName.split('/').at(-1);
  console.log("🚀 ~ file: server.js:17 ~ app.post ~ input:", input);

  const folderPath = `docs/${repositoryName}`; // Replace with the actual path to the folder containing the .txt files

  // Initialize the messages array
  const messages = [];

  // Recursive function to process files and subfolders
  function processFolder(folderPath) {
    const files = fs.readdirSync(folderPath);

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isFile() && path.extname(file).toLowerCase() === '.txt') {
        const content = fs.readFileSync(filePath, 'utf8').trim();

        // Split the content into multiple messages if it exceeds 4000 characters
        if (content.length <= 1000) {
          messages.push({
            role: 'user',
            content: content,
          });
        } else {
          let startIndex = 0;
          while (startIndex < content.length) {
            const endIndex = startIndex + 1000;
            const partialContent = content.substring(startIndex, endIndex);

            messages.push({
              role: 'user',
              content: partialContent,
            });

            startIndex = endIndex;
          }
        }
      } else if (stats.isDirectory()) {
        processFolder(filePath); // Recursively process subfolders
      }
    });
  }

  // Start processing the main folder
  processFolder(folderPath);

  const sliced = messages.slice(0, 8)
  sliced.push({ role: 'user', content: input })
  console.log("🚀 ~ file: server.js:83 ~ app.post ~ sliced:", sliced);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer sk-");

  var raw = JSON.stringify({
    "messages": sliced,
    "model": "gpt-3.5-turbo",
  });
    console.log("🚀 ~ file: server.js:91 ~ app.post ~ messages:", messages.length);


  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://api.openai.com/v1/chat/completions", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log("🚀 ~ file: server.js:123 ~ app.post ~ result:", result);
    //   const folderPath = './responses'; // Replace with the actual path to the folder where you want to save the file
    // const outputFilePath = path.join('./responses', `${repositoryName}.txt`); 
    //   fs.writeFileSync('./responses',`${repositoryName}.txt`, result);
    if (!fs.existsSync('./responses')) {
      fs.mkdirSync('./responses');
    }
  
      fs.writeFileSync(path.join('./responses', `${repositoryName}.txt`), result, 'utf8')
      res.json({ response: result });
    })
    .catch(error => console.log('error', error));

  // const res1 = await processInput(input);
  // console.log("🚀 ~ file: server.js:23 ~ app.post ~ res1:", res1);

  // const command = `node ./dist/index.js '${input}' `;
  // console.log("🚀 ~ file: server.js:28 ~ app.post ~ command:", command);
  // exec(command, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error executing script: ${error}`);
  //     return res.status(500).json({ error: 'Error executing script' }); // Add return statement here
  //   } else {
  //     console.log(`Script output: ${stdout}`);
  //     return res.json({ response: stdout }); // Add return statement here
  //   }
  // });

  // res.json({ response: 'response.text' });
});

app.post('/getPromtResult', async (req, res) => {
  const repositoryName = req.body.git.split('/').at(-1);
  const prompt = req.body.prompt;

  console.log(repositoryName, prompt);
  fs.access(`./responses`, fs.constants.F_OK, (err) => {
    if (err) {
      res.json({ pending: 'no result yet' });
      return;
    }

    fs.readFile(`./responses/${repositoryName}.txt`, 'utf-8', (err, data) => {
      if (err) {
        res.json({ pending: 'no result yet' });
        return;
      }

      res.json({ success: data });
    });
  });
});

app.listen(5001, () => console.log("Server listening on port 5001"))