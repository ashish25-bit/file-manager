const { PATTERN } = require('../constants');
const executeCommand = require('./executeCommand');

async function deleteDirectory(dirPath) {
  try {
    dirPath = dirPath.replace(PATTERN.backwardSlash, '\\\\');

    const cmd = `rmdir /q /s ${dirPath}`;
    await executeCommand(cmd);
    return { error: false, message: null };
  }
  catch (err) {
    return { error: true, message: err.message };
  }
}

module.exports = deleteDirectory;