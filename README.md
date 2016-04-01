# node-fernflower

Simple fernflower java decompiler wrapper

## Installation

A `fernflower <jarFile> <outputDir>` cli can be installed with `npm install -g fernflower`

## Usage

```js
const fernflower=require("fernflower");
const path = require('path');


const inputJar=path.join(__dirname,"fernflower.jar");
const outputDir=path.join(__dirname,"output");

fernflower(inputJar,outputDir)
  .then((decompiledDir) => console.log("Decompiled "+inputJar+" at "+decompiledDir))
  .catch(err => console.log(err.stack));
```
