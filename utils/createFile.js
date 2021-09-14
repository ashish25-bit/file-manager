const path = require('path')
const fs = require("fs");
const executeCommand = require('./executeCommand');

function isPathPresent(dir) {
  if (!fs.existsSync(dir))
    return false;
  return true;
}


/**
 *
 * @param {string} selectedFolder the folder selected by the user
 * @param {string} userInput fileName entered by the user
 * @returns {Promise<Object>} {error: true|false, message: string|null}
 */
function createFile(selectedFolder, userInput) {
  return new Promise(async (resolve, _) => {
    if (isPathPresent(path.join(selectedFolder, userInput))) {
      return resolve({ error: false, message: null });
    }

    // given user input = 'sample/index.js'
    // and selected folder = 'e:\root'
    // the selected folder does not have 'sample' folder inside
    // therefore checking whether the folder is present in the given directory
    // if not making the folder and then creating the file
    const pattern = /[^//]+/g;

    const breakdown = userInput.match(pattern);
    const fileName = breakdown.pop();

    if (breakdown.length !== 0) {
      let currIndex = 0;

      while (currIndex < breakdown.length) {
        let temp = path.join(selectedFolder, breakdown[currIndex]);

        if (!isPathPresent(temp)) break;

        selectedFolder = temp;
        currIndex++;
      }

      if (currIndex < breakdown.length) {
        try {
          const temp = breakdown.splice(currIndex);
          selectedFolder = path.join(selectedFolder, temp.join('\\'));

          const cmd = `mkdir ${selectedFolder}`;
          await executeCommand(cmd);
        }
        catch(err) {
          return { error: true, message: err.message };
        }
      }
    }

    selectedFolder = path.join(selectedFolder, fileName);
    fs.writeFile(selectedFolder, "", (err) => {
      if (err)
        return resolve({ error: true, message: err.message });
      resolve({ error: false, message: null });
    });
  });
}

module.exports = createFile;
