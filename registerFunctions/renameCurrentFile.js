const path = require("path");
const vscode = require("vscode");

const renameCurrentFile = async function () {
  try {
    if (vscode.workspace.workspaceFolders === undefined)
      return;

    const base = vscode.workspace.workspaceFolders[0].uri._fsPath;
    if (!vscode.window.activeTextEditor)
      return;

    const currentFilePath = vscode.window.activeTextEditor.document.uri._fsPath;
    const input = await vscode.window.showInputBox({
      title: `New name for: ${path.basename(currentFilePath)}`,
      value: path.basename(currentFilePath),
    });

    if (input === undefined) return;

    const newName = path.join(path.dirname(currentFilePath), input);

    if (!newName.startsWith(base))
      throw new Error(`The file path: ${newName} is not in the workspace: ${base}`);

    const sourceUri = vscode.Uri.file(currentFilePath);
    const targetUri = vscode.Uri.file(newName);

    console.log(sourceUri)
    console.log(targetUri)

    await vscode.workspace.fs.rename(sourceUri, targetUri);
  }
  catch (err) {
    console.log(err);
    vscode.window.showErrorMessage(err.message);
  }
}

module.exports = renameCurrentFile;
