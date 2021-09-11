const fs = require("fs");

function createFile(filePath) {
  return new Promise((resolve, _) => {
    fs.writeFile(filePath, "", (err) => {
      if (err)
        return resolve({ error: true, message: err.message });
      resolve({ error: false, message: null });
    });
  });
}

module.exports = createFile;
