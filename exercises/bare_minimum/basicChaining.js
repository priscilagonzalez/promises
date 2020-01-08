/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var Promisifier = require('./promisification.js');
var PromiseHelpers = require('./promiseConstructor.js');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  var writeFile = Promise.promisify(fs.writeFile);
  return PromiseHelpers.pluckFirstLineFromFileAsync(readFilePath)
  .then((user) => { return user; })
  .then((userInfo) => { return Promisifier.getGitHubProfileAsync(userInfo); })
  .then((profile) => { return writeFile(writeFilePath, JSON.stringify(profile)); })
  .catch((err) => { return err; });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
