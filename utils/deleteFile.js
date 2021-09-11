const { TERMINAL } = require('../constants');
const executeCommand = require('./executeCommand');

async function deleteFile(filePath) {
  try {
    const currOS = process.platform;

    if (!TERMINAL.delete.hasOwnProperty(currOS))
      throw new Error(`${currOS} is not supported yet`);

    const cmd = `${TERMINAL.delete[currOS]} ${filePath}`;
    await executeCommand(cmd);
  }
  catch (err) {
    throw new Error(err);
  }
}

module.exports = deleteFile;
