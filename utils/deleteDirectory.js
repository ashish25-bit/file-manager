const vscode = require("vscode");

async function deleteDirectory(dirPath) {
  try {
    const targetUri = vscode.Uri.file(dirPath);
    await vscode.workspace.fs.delete(targetUri, {
      recursive: true
    });

    return { error: false, message: null };
  }
  catch (err) {
    return { error: true, message: err.message };
  }
}

module.exports = deleteDirectory;