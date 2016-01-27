'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var karma = require('karma');

function runTests(singleRun, done) {

  var localConfig = {
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: singleRun,
    autoWatch: !singleRun
  };

  var server = new karma.Server(localConfig, function (failCount) {
    done(failCount ? new Error("Failed " + failCount + " tests.") : null);
  });
  server.start();
}

gulp.task('test', ['scripts:test', 'markups'], function (done) {
  runTests(true, done);
});

gulp.task('test:auto', ['scripts:test-watch'], function (done) {
  runTests(false, done);
});