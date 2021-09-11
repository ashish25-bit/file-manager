const vscode = require("vscode");
const getCurrentDirectoryFiles = require('../utils/getFiles');
const deleteFile = require('../utils/deleteFile');
const { ACTIONS_MSG } = require('../constants');

const deleteFileRegisterFunction = async function() {
  try {
    if (vscode.workspace.workspaceFolders === undefined)
      return;

    const base = vscode.workspace.workspaceFolders[0].uri._fsPath;
    const files = await getCurrentDirectoryFiles(base);

    const selectedFile = await vscode.window.showQuickPick(files, {
      matchOnDetail: true,
    });

    if (selectedFile === undefined) return;

    const confirmation = await vscode.window.showInformationMessage(
      `${selectedFile.label} will be deleted permanentely. Press 'Confirm' to confirm deletion`,
      ACTIONS_MSG.delete.confirm,
      ACTIONS_MSG.delete.cancel
    );

    if (confirmation !== ACTIONS_MSG.delete.confirm) return;

    await deleteFile(selectedFile.label);
  }
  catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
}

module.exports = deleteFileRegisterFunction;
