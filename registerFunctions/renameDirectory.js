const vscode = require("vscode");
const getCurrentDirectoryFolders = require('../utils/getFolders');
const rename = require('../utils/rename');

const renameDirectoryRegisterFunction = async function () {
  try {
    if (vscode.workspace.workspaceFolders === undefined)
      return;

    const base = vscode.workspace.workspaceFolders[0].uri._fsPath;
    const folders = await getCurrentDirectoryFolders(base);

    await rename(folders, base);
  }
  catch (err) {
    console.log(err);
    vscode.window.showErrorMessage(err.message);
  }
}

module.exports = renameDirectoryRegisterFunction;
