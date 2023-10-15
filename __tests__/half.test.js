import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '_fixtures_', filename);

test('gendiff', () => {
  expect(gendiff('file1.json', 'file2.json')).toBe(fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8'));
});

test('gendiff - plain', () => {
  expect(gendiff('file1.json', 'file2.json')).toBe(fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8'));
});

test('gendiff - json', () => {
  expect(gendiff('file1.json', 'file2.json')).toBe(fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8'));
});