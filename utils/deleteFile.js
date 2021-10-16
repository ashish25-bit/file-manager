const vscode = require("vscode");

async function deleteFile(filePath) {
  try {
    const targetUri = vscode.Uri.file(filePath);
    await vscode.workspace.fs.delete(targetUri);

    return { error: false, message: null };
  }
  catch (err) {
    return { error: true, message: err.message };
  }
}

module.exports = deleteFile;
