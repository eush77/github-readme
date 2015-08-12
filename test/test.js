'use strict';

var githubReadme = require('..');

var test = require('tape');


test(function (t) {
  t.plan(2);
  githubReadme('git', 'git', function (err, readme) {
    t.ifErr(err);
    t.true(readme.indexOf('the stupid content tracker') >= 0);
  });
});


test('non-existent', function (t) {
  t.plan(1);
  githubReadme('git', Math.random().toString(36).slice(2), function (err) {
    t.true(err);
  });
});
