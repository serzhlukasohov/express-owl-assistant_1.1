const simpleGit = require('simple-git');

const destinationPath = './project'; // Replace with the desired destination folder path

const cloneRepository = async (repositoryUrl) => {
  try {
    await simpleGit().clone(repositoryUrl, destinationPath);
    console.log('Repository cloned successfully!');
    return true;
  } catch (error) {
    console.error('Failed to clone repository:', error);
  }
};

module.exports = cloneRepository