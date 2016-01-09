# t2-compiler

A cross compiler for npm packages that use node-gyp or node-pre-gyp that stores on s3 for use by the tessel cli.

[![Travis Build Status](https://travis-ci.org/tessel/t2-compiler.svg?branch=master)](https://travis-ci.org/tessel/t2-compiler)
[![Build status](https://ci.appveyor.com/api/projects/status/fsjh9hxbf1w09794?svg=true)](https://ci.appveyor.com/project/rwaldron/t2-compiler)
=======

```bash
vagrant up
# On your computer
# ./compile.sh package-name@version
./compile.sh serialport@2.0.5
```

Look in the 'out' directory


# Infrastructure

s3 bucket backed
nginx ssl terminator
