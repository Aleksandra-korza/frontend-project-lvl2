#!/usr/bin/env node

import { Command } from 'commander'; // исполняемый файл это и он должен быть в папке bin.

const program = new Command(); // взяли из библиотеки класс команд, создали экземпляр этого класса и будем с помощью методов делать выводы на экран версии и хелп и тд. 

program
    .version("0.1.0")
    .description("Compares two configuration files and shows a difference.")
    .helpOption("-h, --help", "output usage information")
    .option("-f, --format", <type></type>,  "output format")
    .arguments()
    .parse(process.argv);