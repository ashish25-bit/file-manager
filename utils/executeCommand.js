const { exec }= require('child_process');

/**
 *
 * @param {string} command cannot be null or undefined
 * @returns Promise<string>
 */
async function executeCommand(command) {
  return new Promise((resolve, reject) => {
    if (command === undefined || command === null)
      return reject('Command provided cannot be null or undefined');
    exec(command, (err, stdout, stderr) => {
      if (err) return reject(stderr);
      else resolve(stdout);
    });
  });
}

module.exports = executeCommand;
