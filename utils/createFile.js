const fs = require("fs");

function isPathPresent(dir) {
  if (!fs.existsSync(dir))
    return false;
  return true;
}


function createFile(filePath) {
  return new Promise((resolve, _) => {
    if (isPathPresent(filePath)) {
      return resolve({ error: false, message: null });
    }

    fs.writeFile(filePath, "", (err) => {
      if (err)
        return resolve({ error: true, message: err.message });
      resolve({ error: false, message: null });
    });
  });
}

module.exports = createFile;
