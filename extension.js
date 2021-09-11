const vscode = require("vscode");

// register command callbacks
const createFileRegisterFunction = require('./registerFunctions/createFile');
const createDirectoryRegisterFunction = require('./registerFunctions/createDirectory');

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

  context.subscriptions.push(createNewFileDisposable);
  context.subscriptions.push(createNewDirectoryDisposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
