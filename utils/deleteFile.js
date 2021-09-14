const { TERMINAL } = require('../constants');
const executeCommand = require('./executeCommand');

async function deleteFile(filePath) {
  try {
    const currOS = process.platform;

    if (!TERMINAL.delete.hasOwnProperty(currOS))
      throw new Error(`${currOS} is not supported yet`);

    const cmd = `${TERMINAL.delete[currOS]} ${filePath}`;
    await executeCommand(cmd);

    return { error: false, message: null };
  }
  catch (err) {
    return { error: true, message: err.message };
  }
}

module.exports = deleteFile;
