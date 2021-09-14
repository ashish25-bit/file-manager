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

    const selectedFiles = await vscode.window.showQuickPick(files, {
      matchOnDetail: true,
      canPickMany: true
    });

    if (selectedFiles === undefined) return;

    if (selectedFiles.length === 0) return;

    const data = selectedFiles.map(f => f.label).join('\n');

    const confirmation = await vscode.window.showInformationMessage(
      `${data} will be deleted permanentely. Press 'Confirm' to confirm deletion`,
      ACTIONS_MSG.delete.confirm,
      ACTIONS_MSG.delete.cancel
    );

    if (confirmation !== ACTIONS_MSG.delete.confirm) return;

    for (const selectedFile of selectedFiles) {
      const result = await deleteFile(selectedFile.label);

      if (result.error)
        vscode.window.showErrorMessage(result.message);
    }

  }
  catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
}

module.exports = deleteFileRegisterFunction;
