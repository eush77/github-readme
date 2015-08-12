'use strict';

var rewire = require('rewire');

var githubReadme = rewire('..');

var test = require('tape');

var fs = require('fs');


test(function (t) {
  t.plan(2);

  githubReadme.__set__('ghget', fakeGithubGet({
    'LICENSE': '',
    'main.c': '',
    'CONTRIBUTING.md': '',
    'README': fs.readFileSync(__dirname + '/git_readme.txt', 'utf8')
  }));

  githubReadme('git', 'git', function (err, readme) {
    t.ifErr(err);
    t.true(readme.indexOf('the stupid content tracker') >= 0);
  });
});


test('non-existent repo', function (t) {
  t.plan(1);

  githubReadme.__set__('ghget', fakeGithubGet());

  githubReadme('git', Math.random().toString(36).slice(2), function (err) {
    t.true(err);
  });
});


test('non-existent file', function (t) {
  t.plan(1);

  githubReadme.__set__('ghget', fakeGithubGet({
    'LICENSE': '',
    'main.c': '',
    'CONTRIBUTING.md': ''
  }));

  githubReadme('git', 'git', function (err) {
    t.true(err);
  });
});


function fakeGithubGet (files) {
  return function (user, repo, path, opts, cb) {
    if (typeof path != 'string') {
      cb = opts;
      opts = path;
      path = '/';
    }
    if (typeof opts == 'function') {
      cb = opts;
      opts = {};
    }

    return (path == '/'
            ? (files
               ? cb(null, null, Object.keys(files))
               : cb(Error('repo does not exist')))
            : (files && files[path]
               ? cb(null, null, files[path])
               : cb(Error('file does not exist'))));
  };
}
