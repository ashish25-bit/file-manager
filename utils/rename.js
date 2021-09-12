const vscode = require("vscode");
const path = require("path");

async function renameFile(data) {
  try {
    const selectedData = await vscode.window.showQuickPick(data, {
      matchOnDetail: true,
    });

    if (selectedData === undefined) return;

    // input the filename
    const input = await vscode.window.showInputBox({
      title: `New name for: ${selectedData.label}`,
      value: path.basename(selectedData.label),
    });

    if (input === undefined) return;

    const sourceUri = vscode.Uri.file(selectedData.label);
    const targetUri = vscode.Uri.file(`${path.dirname(selectedData.label)}\\${input}`);

    console.log(sourceUri, targetUri);
    await vscode.workspace.fs.rename(sourceUri, targetUri);
  }
  catch (err) {
    throw new Error(err);
  }
  // F:\file-manager\constants
}

module.exports = renameFile;
