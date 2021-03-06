const vscode = require("vscode");
const getCurrentDirectoryFolders = require('../utils/getFolders');
const createDirectory = require('../utils/createDirectory');
const { PATTERN } = require('../constants');
const path = require("path");

const createDirectoryRegisterFunction = async function() {
  try {
    if (vscode.workspace.workspaceFolders === undefined) return;

    const base = vscode.workspace.workspaceFolders[0].uri._fsPath;
    const folders = await getCurrentDirectoryFolders(base);

    // getting the selected folder
    const selectedFolder = await vscode.window.showQuickPick(folders, {
      matchOnDetail: true,
      title: "Select Folder (new directory)"
    });

    if (selectedFolder === undefined) return;

    // input the filename
    const input = await vscode.window.showInputBox({
      title: selectedFolder.label,
    });

    if (input === undefined) return;

    // input: sample sample/utils
    // files: ['sample', 'sample/utils']
    const directories = input.match(PATTERN.removeSpace);

    // creating new directories
    for (const directory of directories) {
      // const dirPath = `${selectedFolder.label}\\${directory}`;
      const dirPath = path.join(selectedFolder.label, directory);

      if (!dirPath.startsWith(base)) {
        vscode.window.showErrorMessage(`Selected path: ${dirPath} is out of the current working directory ${base}`);
      }
      else {
        const result = await createDirectory(dirPath);

        if (result.error) {
          vscode.window.showErrorMessage(result.message);
        }
      }
    }
  }
  catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
}

module.exports = createDirectoryRegisterFunction;
