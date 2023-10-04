#!/usr/bin/env node

import { program } from 'commander'; // исполняемый файл это и он должен быть в папке bin.
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
    // const path1 = path.resolve(process.cwd(), filepath1); // конструируем полный путь process.cwd()
    // const path2 = path.resolve(process.cwd(), filepath2);
    // const file1 = fs.readFileSync(path1, 'utf-8'); // fs - модуль для работы с файловой системой на JS,
    // const file2 = fs.readFileSync(path2, 'utf-8');
    // const obj1 = JSON.parse(file1); // расп. файлы JSON.parse(file1):изJSON строки->в вид обj
    // const obj2 = JSON.parse(file2);
    console.log(gendiff(filepath1, filepath2, program.opts().format));
  })
  .parse();
