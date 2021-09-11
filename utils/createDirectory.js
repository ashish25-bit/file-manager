const { PATTERN } = require('../constants');
const executeCommand = require('./executeCommand');

async function createDirectory(dirPath) {
  try {
    dirPath = dirPath.replace(PATTERN.forwardSlash, '\\');

    const cmd = `mkdir ${dirPath}`;
    await executeCommand(cmd);

    return { error: false, message: null };
  }
  catch (err) {
    return { error: true, message: err };
  }
}

module.exports = createDirectory;
