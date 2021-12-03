const path = require("path");
const vscode = require("vscode");
const { ACTIONS_MSG, TERMINAL } = require("../constants");
const executeCommand = require("./executeCommand");
const getCurrentDirectoryFiles = require("./getFiles");
const getCurrentDirectoryFolders = require("./getFolders");

/**
 * 
 * @param {string} type default value is folder
 * @returns nothing
 */
async function moveFileOrDirectory(type = ACTIONS_MSG.moveType.folder) {
  try {
    if (vscode.workspace.workspaceFolders === undefined)
      return;

    if (type === undefined || type === null)
      type = ACTIONS_MSG.moveType.folder;

    if (
      type !== ACTIONS_MSG.moveType.file &&
      type !== ACTIONS_MSG.moveType.folder
    )
      type = ACTIONS_MSG.moveType.folder;

    let data = [];
    const base = vscode.workspace.workspaceFolders[0].uri._fsPath;

    // if moving a file all the files must be shown
    if (type === ACTIONS_MSG.moveType.file) {
      data = await getCurrentDirectoryFiles(base);
    }
    // if moving a directory all the folders must be shown
    // but not the root of the workspace
    else {
      data = await getCurrentDirectoryFolders(base);
      data.shift();
    }

    data = data.map((d, index) => { return { label: d.label, index } });

    // getting the selected folder
    const sourceSelected = await vscode.window.showQuickPick(data, {
      title: `Select source ${type}`,
      matchOnDetail: true,
    });

    if (sourceSelected === undefined) return;

    // if moving a file then quick pick must show folders
    // selecting folders
    if (type === ACTIONS_MSG.moveType.file)
      data = await getCurrentDirectoryFolders(base);
    // if moving a directory then the selected directory must be removed
    // and the base directory should be added
    else {
      data.splice(sourceSelected.index, 1);
      data.unshift({ label: base })
    }

    const destinationSelected = await vscode.window.showQuickPick(data, {
      title: `Select destination folder`,
      matchOnDetail: true
    })

    if (destinationSelected === undefined) return;

    const sourceUri = vscode.Uri.file(sourceSelected.label);
    let fileName = path.basename(sourceSelected.label);
    fileName = path.join(destinationSelected.label, fileName);
    let targetUri = vscode.Uri.file(fileName);

    await vscode.workspace.fs.copy(sourceUri, targetUri, { overwrite: false });

    if (type === ACTIONS_MSG.moveType.file)
      await vscode.workspace.fs.delete(sourceUri);
    else
      await vscode.workspace.fs.delete(sourceUri, { recursive: true });
  }
  catch (err) {
    throw new Error(err);
  }
}

module.exports = moveFileOrDirectory;
