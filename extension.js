const vscode = require("vscode");

// register command callbacks
const createFileRegisterFunction = require('./registerFunctions/createFile');
const createDirectoryRegisterFunction = require('./registerFunctions/createDirectory');
const deleteDirectoryRegisterFunction = require('./registerFunctions/deleteDirectory');
const deleteFileRegisterFunction = require('./registerFunctions/deleteFile');

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

  context.subscriptions.push(createNewFileDisposable);
  context.subscriptions.push(createNewDirectoryDisposable);
  context.subscriptions.push(deleteDirectoryDisposable);
  context.subscriptions.push(deleteFileDisposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
