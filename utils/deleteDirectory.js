const { PATTERN } = require('../constants');
const executeCommand = require('./executeCommand');

async function deleteDirectory(dirPath) {
  try {
    dirPath = dirPath.replace(PATTERN.backwardSlash, '\\\\');

    const cmd = `rmdir /q /s ${dirPath}`;
    await executeCommand(cmd);
  }
  catch (err) {
    throw new Error(err);
  }
}

module.exports = deleteDirectory;