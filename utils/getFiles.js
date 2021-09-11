const vscode = require('vscode');
const { EXCLUDE_FOLDERS } = require('../constants');

async function getFiles(base, files) {
  try {
    const uriPath = vscode.Uri.file(base);
    const currDirFolders = await vscode.workspace.fs.readDirectory(uriPath);

    for (const [name, type] of currDirFolders) {
      if (type === 1) {
        const filePath = `${base}\\${name}`;
        files.push(filePath);
      }
    }

    for (const [name, type] of currDirFolders) {
      if (!EXCLUDE_FOLDERS.hasOwnProperty(name) && type === 2) {
        const subDir = `${base}\\${name}`;
        await getFiles(subDir, files);
      }
    }
  }
  catch (err) {
    throw new Error(err);
  }
}

async function getCurrentDirectoryFiles(base) {
  try {
    let files = [];
    await getFiles(base, files);

    files = files.map(file => { return { label: file } });
    return files;
  }
  catch (err) {
    throw new Error(err);
  }
}

module.exports = getCurrentDirectoryFiles;
