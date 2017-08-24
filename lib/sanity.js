#!/usr/bin/env node

var shell = require('shelljs');

if (!shell.which('docker')) {
  shell.echo('Docker not found... install this first!');
} else {
  shell.echo('docker ok');
}

