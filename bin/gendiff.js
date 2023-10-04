#!/usr/bin/env node

import { program } from 'commander'; // исполняемый файл  в папке bin.
// import fs from 'fs';
// import path from 'path';
import gendiff from '../index.js';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2, program.opts().format));
  })
  .parse();
