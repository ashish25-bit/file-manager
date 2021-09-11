const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  console.log('file manager loaded');
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
