const PATTERN = {
  removeSpace: /[^\s]+/g,
  forwardSlash: /\//g,
  backwardSlash: /\\/g,
};
Object.freeze(PATTERN);

const EXCLUDE_FOLDERS = {
  ".git": true,
  node_modules: true,
};
Object.freeze(EXCLUDE_FOLDERS);

const TERMINAL = {
  delete: {
    darwin: 'rm',
    linux: 'rm',
    win32: 'del'
  },
  move: {
    darwin: 'mv',
    linux: 'mv',
    win32: 'move'
  }
};
Object.freeze(TERMINAL);

const ACTIONS_MSG = {
  delete: {
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  moveType: {
    folder: "folder",
    file: "file"
  }
}
Object.freeze(ACTIONS_MSG);

module.exports = { PATTERN, EXCLUDE_FOLDERS, TERMINAL, ACTIONS_MSG };
