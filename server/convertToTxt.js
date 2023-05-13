const fs = require('fs');
const path = require('path');

function convertTxt() {
  const sourceDir = './project';
  const outputDir = './output';
  const fileTypes = ['.md', '.js', '.ts', '.css', '.html', '.json', '.sql'];

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = getFilesRecursive(sourceDir, fileTypes);

  files.forEach((file) => {
    const inputFilePath = file;
    const relativePath = path.relative(sourceDir, inputFilePath);
    const outputFileDir = path.join(outputDir, path.dirname(relativePath));
    const outputFile = path.join(
      outputFileDir,
      `${path.parse(file).name}${path.parse(file).ext}.txt`
    );

    if (!fs.existsSync(outputFileDir)) {
      fs.mkdirSync(outputFileDir, { recursive: true });
    }

    const fileContent = fs.readFileSync(inputFilePath, 'utf8');
    const outputContent = `This is a txt representation of the VirtueMaster file located at ${relativePath}\n\n${fileContent}`;
    fs.writeFileSync(outputFile, outputContent, 'utf8');
  });
}

function getFilesRecursive(dir, fileTypes) {
  let files = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const dirEntries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of dirEntries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getFilesRecursive(fullPath, fileTypes));
    } else if (entry.isFile() && fileTypes.includes(path.extname(fullPath))) {
      files.push(fullPath);
    }
  }

  return files;
}

module.exports = convertTxt