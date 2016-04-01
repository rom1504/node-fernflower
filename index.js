'use strict';

const path = require('path');
const spawn = require('child_process').spawn;
const promisify = require("es6-promisify");
const mkdirp=promisify(require("mkdirp"));
const extract = promisify(require('extract-zip'));

function runFernflower(inputDir,outputDir)
{
  var fernflowerProcess=spawn('java', [
    '-jar',
    path.join(__dirname,"fernflower.jar"),
    inputDir,
    outputDir
  ]);

  return new Promise((resolve)=> {
    fernflowerProcess.on('exit', function() {
      resolve();
    });
  });
}

module.exports=function(inputJar,outputDir)
{
  var compiledDir=path.join(outputDir,"compiled");
  var decompiledDir=path.join(outputDir,"decompiled");
  return mkdirp(compiledDir)
    .then(() => mkdirp(decompiledDir))
    .then(() => extract(inputJar, {dir: compiledDir}))
    .then(() => runFernflower(compiledDir, decompiledDir))
    .then(() => decompiledDir);
};