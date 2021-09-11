const vscode = require("vscode");
const getCurrentDirectoryFolders = require('../utils/getFolders');
const deleteDirectory = require('../utils/deleteDirectory');
const { ACTIONS_MSG } = require('../constants');

const deleteDirectoryRegisterFunction = async function() {
  try {
    if (vscode.workspace.workspaceFolders === undefined)
      return;

    // getting the folders and subfolders for the current directory
    const base = vscode.workspace.workspaceFolders[0].uri._fsPath;
    const folders = await getCurrentDirectoryFolders(base);
    folders.shift();

    // getting the selected folder
    const selectedFolder = await vscode.window.showQuickPick(folders, {
      matchOnDetail: true,
    });

    if (selectedFolder === undefined) return;

    const confirmation = await vscode.window.showInformationMessage(
      `${selectedFolder.label} will be deleted permanentely. Press 'Confirm' to confirm deletion`,
      ACTIONS_MSG.delete.confirm,
      ACTIONS_MSG.delete.cancel
    );

    if (confirmation !== ACTIONS_MSG.delete.confirm) return;

    await deleteDirectory(selectedFolder.label);
  }
  catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
}

module.exports = deleteDirectoryRegisterFunction;
