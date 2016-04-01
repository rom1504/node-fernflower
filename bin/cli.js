#!/usr/bin/env node

const fernflower=require("fernflower");
const path = require('path');

if(process.argv.length !=4) {
  console.log("Usage : fernflower <jarFile> <outputDir>");
  process.exit(1);
}

const inputJar=process.argv[2];
const outputDir=process.argv[3];

fernflower(inputJar,outputDir)
  .then((decompiledDir) => console.log("Decompiled "+inputJar+" at "+decompiledDir))
  .catch(err => console.log(err.stack));
