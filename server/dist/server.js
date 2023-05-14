// @ts-nocheck
import http from "http";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { convertToTxt } from "./textConverter.js";
import { chat } from "./index.js";
const folderName = "../project";
const currentDir = process.cwd();
const newFolderPath = path.join(currentDir, folderName);
if (!fs.existsSync(newFolderPath)) {
  fs.mkdirSync(newFolderPath);
}
const hostName = "localhost";
const serverPort = 8080;
const downloadProject = (req, res) => {
  const { url } = req;
  const params = {};
  let responseText = '{"downloaded": true}';
  if (url.includes("?")) {
    const [path, queryString] = url.split("?");
    const queryParameters = queryString.split("&");
    queryParameters.forEach((param) => {
      const [key, value] = param.split("=");
      params[key] = value;
    });
  }
  if (params.git) {
    const gitFolderName = params.git.split("/").pop();
    const gitFolderPath = path.join(currentDir, folderName, gitFolderName);
    if (!fs.existsSync(gitFolderPath)) {
      const gitProcess = spawn("git", [
        "clone",
        `https://github.com/${params.git}`,
        gitFolderPath,
      ]);
      gitProcess.on("close", (code) => {
        if (code === 0) {
          responseText = `{ Success: true }`;
          return "ok";
        } else {
          responseText = '{"something_wrong": true}';
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(responseText);
      });
      return;
    } else {
      responseText = `{ Success: lol }`;
    }
  } else {
    responseText = '{"something_wrong": true}';
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(responseText);
};
export function startServer() {
  const server = http.createServer((req, res) => {
    console.log("🚀 ~ file: server.js:66 ~ server ~ res:", res.statusCode);
    downloadProject(req, res);
    if (res.statusCode) {
      setTimeout(() => {
        console.log("Converting to txt in progress...");
        const convertResult = convertToTxt();
        if (convertResult) {
          console.log("Converting to txt completed...");
          setTimeout(() => {
            chat();
          }, 5001);
        }
      }, 5001);
    }
  });
  server.listen(serverPort, hostName, () => {
    console.log(`Server started http://${hostName}:${serverPort}`);
  });
}
console.log(startServer());
// process.on('SIGINT', () => {
//   server.close(() => {
//     console.log('Server stopped.');
//     process.exit();
//   });
// });
//# sourceMappingURL=server.js.map
