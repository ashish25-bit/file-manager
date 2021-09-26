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
    const selectedFolders = await vscode.window.showQuickPick(folders, {
      matchOnDetail: true,
      canPickMany: true,
      title: "Select folders for deleting"
    });

    if (selectedFolders === undefined) return;

    if (selectedFolders.length === 0) return;

    const data = selectedFolders.map(f => f.label).join('\n');

    const confirmation = await vscode.window.showInformationMessage(
      `${data} will be deleted permanentely. Press 'Confirm' to confirm deletion`,
      ACTIONS_MSG.delete.confirm,
      ACTIONS_MSG.delete.cancel
    );

    if (confirmation !== ACTIONS_MSG.delete.confirm) return;

    for (const selectedFolder of selectedFolders) {
      const result = await deleteDirectory(selectedFolder.label);

      if (result.error) {
        vscode.window.showErrorMessage(result.message);
      }
    }
  }
  catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
}

module.exports = deleteDirectoryRegisterFunction;
