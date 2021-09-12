const vscode = require("vscode");
const getCurrentDirectoryFiles = require('../utils/getFiles');
const rename = require('../utils/rename');

const renameFileRegisterFunction = async function () {
  try {
    if (vscode.workspace.workspaceFolders === undefined)
      return;

    const base = vscode.workspace.workspaceFolders[0].uri._fsPath;
    const files = await getCurrentDirectoryFiles(base);

    await rename(files);
  }
  catch (err) {
    console.log(err);
    vscode.window.showErrorMessage(err.message);
  }
}

module.exports = renameFileRegisterFunction;
