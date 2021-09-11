const vscode = require("vscode");
const getCurrentDirectoryFolders = require('../utils/getFolders');
const createFile = require('../utils/createFile');
const { PATTERN } = require('../constants');

const createFileRegisterFunction = async function () {
  try {
    // checking whether a workspace is opened or not
    if (vscode.workspace.workspaceFolders === undefined)
      return;

    const base = vscode.workspace.workspaceFolders[0].uri._fsPath;
    const folders = await getCurrentDirectoryFolders(base);

    // getting the selected folder
    const selectedFolder = await vscode.window.showQuickPick(folders, {
      matchOnDetail: true,
    });

    if (selectedFolder === undefined) return;

    // input the filename
    const input = await vscode.window.showInputBox({
      title: `New file ${selectedFolder.label}`,
    });

    if (input === undefined) return;

    // input: index.js  node.js   index.html
    // files: ['index.js', 'node.js', 'index.html']
    const inputFiles = input.match(PATTERN.removeSpace);

    // creating new files
    for (const file of inputFiles) {
      const filePath = `${selectedFolder.label}\\${file}`;
      const result = await createFile(filePath);

      if (result.error) {
        vscode.window.showErrorMessage(result.message);
      }
    }
  }
  catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
}

module.exports = createFileRegisterFunction;