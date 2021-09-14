const vscode = require("vscode");
const getCurrentDirectoryFolders = require('../utils/getFolders');
const createFile = require('../utils/createFile');
const { PATTERN } = require('../constants');
const path = require("path");

const createFileRegisterFunction = async function () {
  try {
    // checking whether a workspace is opened or not
    if (vscode.workspace.workspaceFolders === undefined)
      return;

    const base = vscode.workspace.workspaceFolders[0].uri._fsPath;
    const folders = await getCurrentDirectoryFolders(base);

    // getting the selected folder
    const selectedFolder = await vscode.window.showQuickPick(folders, {
      matchOnDetail: true,
    });

    if (selectedFolder === undefined) return;

    // input the filename
    const input = await vscode.window.showInputBox({
      title: `New file ${selectedFolder.label}`,
    });

    if (input === undefined) return;

    // input: index.js  node.js   index.html
    // files: ['index.js', 'node.js', 'index.html']
    const inputFiles = input.match(PATTERN.removeSpace);

    // creating new files
    for (const file of inputFiles) {
      // const filePath = `${selectedFolder.label}\\${file}`;
      const filePath = path.join(selectedFolder.label, file);

      // checking whether the filepath is within the workspace
      if (!filePath.startsWith(base)) {
        vscode.window.showErrorMessage(`The filePath: ${filePath} is not in the workspace: ${base}`);
      }

      else {
        const result = await createFile(selectedFolder.label, file);

        if (result.error) {
          vscode.window.showErrorMessage(result.message);
        }
        // if file is created successfully then create open the file
        else {
          const uri = vscode.Uri.file(filePath);
          let doc = await vscode.workspace.openTextDocument(uri);
          await vscode.window.showTextDocument(doc, { preview: false });
        }
      }
    }
  }
  catch (err) {
    vscode.window.showErrorMessage(err.message);
  }
}

module.exports = createFileRegisterFunction;
