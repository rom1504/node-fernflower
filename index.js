'use strict';

const path = require('path');
const spawn = require('child_process').spawn;
const promisify = require("es6-promisify");
const mkdirp=promisify(require("mkdirp"));
const extract = promisify(require('extract-zip'));

function runFernflower(inputDir,outputDir,showProgress)
{
  var fernflowerProcess=spawn('java', [
    '-jar',
    path.join(__dirname,"fernflower.jar"),
    inputDir,
    outputDir],
    {
      stdio: 'pipe'
    });

  fernflowerProcess.stdout.setEncoding('utf8');
  fernflowerProcess.stderr.setEncoding('utf8');
  var buffer = "";
  fernflowerProcess.stdout.on('data', onData);
  fernflowerProcess.stderr.on('data', onData);

  function onData(data) {
    buffer += data;
    var lines = buffer.split("\n");
    var len = lines.length - 1;
    for(var i = 0; i < len; ++i) {
      if(showProgress) console.log(lines[i]);
    }
    buffer = lines[lines.length - 1];
  }

  return new Promise((resolve)=> {
    fernflowerProcess.on('exit', function() {
      resolve();
    });
  });
}

module.exports=function(inputJar,outputDir,showProgress)
{
  var compiledDir=path.join(outputDir,"compiled");
  var decompiledDir=path.join(outputDir,"decompiled");
  return mkdirp(compiledDir)
    .then(() => mkdirp(decompiledDir))
    .then(() => extract(inputJar, {dir: compiledDir}))
    .then(() => runFernflower(compiledDir, decompiledDir,showProgress))
    .then(() => decompiledDir);
};