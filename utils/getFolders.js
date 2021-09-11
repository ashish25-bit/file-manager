const vscode = require('vscode');
const { EXCLUDE_FOLDERS } = require('../constants');

async function getFoldersSubFolders(base, folders) {
  try {
    folders.push(base);
    const uriPath = vscode.Uri.file(base);

    const currDirFolders = await vscode.workspace.fs.readDirectory(uriPath);

    for (const [name, type] of currDirFolders) {
      if (!EXCLUDE_FOLDERS.hasOwnProperty(name) && type === 2) {
        const subDir = `${base}\\${name}`;
        await getFoldersSubFolders(subDir, folders);
      }
    }
  }
  catch (err) {
    throw new Error(err);
  }
} 

async function getCurrentDirectoryFolders(base) {
  try {
    let folders = [];
    await getFoldersSubFolders(base, folders);

    folders = folders.map(folder => { return { label: folder } });
    return folders;
  }
  catch (err) {
    throw new Error(err);
  }
}

module.exports = getCurrentDirectoryFolders;
