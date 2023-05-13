const simpleGit = require('simple-git');

const destinationPath = './projects'; // Replace with the desired destination folder path

const cloneRepository = async (repositoryUrl, repositoryName) => {
  try {
    await simpleGit().clone(repositoryUrl, `${destinationPath}/${repositoryName}`);
    console.log('Repository cloned successfully!');
    return true;
  } catch (error) {
    console.error('Failed to clone repository:', error);
  }
};

module.exports = cloneRepository