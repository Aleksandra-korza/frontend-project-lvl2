import { test, expect } from '@jest/globals';
// @ts-check

import test from 'node:test';
import { expect } from 'expect';
import half from '../index.js';

test('half', () => {
  expect(half(6)).toBe(3);
  expect(half(3)).toBe(3);
});
//хз, что то скопировала и не понимаю что