const fs = require('fs');
const which = require('which');

exports.resolveBin = (
  modName,
  { executable = modName, cwd = process.cwd() } = {},
) => {
  let pathFromWhich;

  try {
    pathFromWhich = which.sync(executable);
    if (pathFromWhich) {
      return executable;
    }
    return null;
  } catch (error) {}
};