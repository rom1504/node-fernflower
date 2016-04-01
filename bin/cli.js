#!/usr/bin/env node

const fernflower=require("fernflower");
const path = require('path');

if(process.argv.length <4 || process.argv.length >5) {
  console.log("Usage : fernflower <jarFile> <outputDir> [<verbose>]");
  process.exit(1);
}

const inputJar=process.argv[2];
const outputDir=process.argv[3];
const verbose=process.argv[4];

fernflower(inputJar,outputDir,verbose)
  .then((decompiledDir) => console.log("Decompiled "+inputJar+" at "+decompiledDir))
  .catch(err => console.log(err.stack));
