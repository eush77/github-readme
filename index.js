'use strict';

var ghget = require('github-get'),
    readmeFilenames = require('readme-filenames');


module.exports = function (user, repo, cb) {
  ghget(user, repo, function (err, data, filenames) {
    if (err) return cb(err);

    var found = filenames.some(function (filename) {
      if (readmeFilenames.indexOf(filename) >= 0) {
        fetch(filename);
        return true;
      }
    });

    if (!found) {
      return cb(Error('README not found.'));
    }
  });

  function fetch (filename) {
    ghget(user, repo, filename, { decode: true }, function (err, data, content) {
      cb(err, content);
    });
  }
};
