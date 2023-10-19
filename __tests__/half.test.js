import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../scr/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  {
    file1: 'file1.json', file2: 'file2.yaml', formatter: '', expected: 'resultStylish.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', formatter: 'stylish', expected: 'resultStylish.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', formatter: 'stylish', expected: 'resultStylish.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', formatter: 'plain', expected: 'resultPlain.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yaml', formatter: 'plain', expected: 'resultPlain.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', formatter: 'json', expected: 'resultJson.txt',
  },
])('gendiff', ({
  file1, file2, formatter, expected,
}) => {
  expect(gendiff(file1, file2, formatter)).toBe(fs.readFileSync(getFixturePath(expected), 'utf-8'));
});
