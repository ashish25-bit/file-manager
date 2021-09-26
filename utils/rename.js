const vscode = require("vscode");
const path = require("path");

async function renameFile(data, base) {
  try {
    const selectedData = await vscode.window.showQuickPick(data, {
      matchOnDetail: true,
      title: "Select file/folder to be renamed."
    });

    if (selectedData === undefined) return;

    // input the filename
    const input = await vscode.window.showInputBox({
      title: `New name for: ${selectedData.label}`,
      value: path.basename(selectedData.label),
    });

    if (input === undefined) return;

    const sourceUri = vscode.Uri.file(selectedData.label);
    const targetUri = vscode.Uri.file(path.join(path.dirname(selectedData.label), input));

    if (!targetUri.fsPath.startsWith(base)) {
      throw new Error(`New name: ${targetUri.fsPath} is outside the workspace: ${base}`);
    }
    await vscode.workspace.fs.rename(sourceUri, targetUri);
  }
  catch (err) {
    throw new Error(err);
  }
}

module.exports = renameFile;
