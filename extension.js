const vscode = require("vscode");

// register command callbacks
const createFileRegisterFunction = require('./registerFunctions/createFile');
const createDirectoryRegisterFunction = require('./registerFunctions/createDirectory');
const deleteDirectoryRegisterFunction = require('./registerFunctions/deleteDirectory');
const deleteFileRegisterFunction = require('./registerFunctions/deleteFile');
const renameFileRegisterFunction = require('./registerFunctions/renameFile');
const renameDirectoryRegisterFunction = require('./registerFunctions/renameDirectory');
const renameCurrentFileRegisterFunction = require("./registerFunctions/renameCurrentFile");
const moveFileOrDirectory = require("./utils/moveFileOrDirectory");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  console.log('file manager loaded');

  let createNewFileDisposable = vscode.commands.registerCommand(
    "file.makeNewFile",
    createFileRegisterFunction
  );

  let createNewDirectoryDisposable = vscode.commands.registerCommand(
		"file.createNewDirectory",
    createDirectoryRegisterFunction
	)

  let deleteDirectoryDisposable = vscode.commands.registerCommand(
		"file.deleteDirectory",
		deleteDirectoryRegisterFunction
	)

  let deleteFileDisposable = vscode.commands.registerCommand(
    "file.deleteFile",
    deleteFileRegisterFunction
  )

  let renameFileDisposable = vscode.commands.registerCommand(
    "file.renameFile",
    renameFileRegisterFunction
  )

  let renameDirectoryDisposable = vscode.commands.registerCommand(
    "file.renameDirectory",
    renameDirectoryRegisterFunction
  )

  let renameCurrentFile = vscode.commands.registerCommand(
    "file.renameCurrentFile",
    renameCurrentFileRegisterFunction
  )

  let moveFileDisposable = vscode.commands.registerCommand(
    "file.moveFile",
    async function() {
      try {
        if (vscode.workspace.workspaceFolders === undefined)
          return;

        await moveFileOrDirectory('file');
      }
      catch (err) {
        vscode.window.showErrorMessage(err.message);
      }
    }
  )

  let moveDirectoryDisposable = vscode.commands.registerCommand(
    "file.moveDirectory",
    async function() {
      try {
        if (vscode.workspace.workspaceFolders === undefined)
          return;

        await moveFileOrDirectory('folder');
      }
      catch (err) {
        vscode.window.showErrorMessage(err.message);
      }
    }
  )

  context.subscriptions.push(createNewFileDisposable);
  context.subscriptions.push(createNewDirectoryDisposable);
  context.subscriptions.push(deleteDirectoryDisposable);
  context.subscriptions.push(deleteFileDisposable);
  context.subscriptions.push(renameFileDisposable);
  context.subscriptions.push(renameDirectoryDisposable);
  context.subscriptions.push(renameCurrentFile);
  context.subscriptions.push(moveFileDisposable);
  context.subscriptions.push(moveDirectoryDisposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
