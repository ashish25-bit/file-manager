const vscode = require("vscode");

// register command callbacks
const createFileRegisterFunction = require('./registerFunctions/createFile');
const createDirectoryRegisterFunction = require('./registerFunctions/createDirectory');
const deleteDirectoryRegisterFunction = require('./registerFunctions/deleteDirectory');
const deleteFileRegisterFunction = require('./registerFunctions/deleteFile');
const renameFileRegisterFunction = require('./registerFunctions/renameFile');
const renameDirectoryRegisterFunction = require('./registerFunctions/renameDirectory');

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

  context.subscriptions.push(createNewFileDisposable);
  context.subscriptions.push(createNewDirectoryDisposable);
  context.subscriptions.push(deleteDirectoryDisposable);
  context.subscriptions.push(deleteFileDisposable);
  context.subscriptions.push(renameFileDisposable);
  context.subscriptions.push(renameDirectoryDisposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
