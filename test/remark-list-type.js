import fs from 'fs';
import path from 'path';
import test from 'ava';
import remark from 'remark';
import hidden from 'is-hidden';
import negate from 'negate';
import listType from '../lib/remark-list-type';

const read = fs.readFileSync;
const exists = fs.existsSync;

test('listType()', t => {
  t.is(typeof listType, 'function', 'should be a function');

  t.notThrows(() => {
    listType.call(remark);
  }, 'should not throw if not passed options');
});

const ROOT = path.join(__dirname, 'fixtures');
const fixtures = fs.readdirSync(ROOT).filter(negate(hidden));

function macro(t, input, expected) {
  const filepath = ROOT + '/' + expected;
  let config = filepath + '/config.json';
  let result;
  let fail;

  config = exists(config) ? require(config) : {};

  config.cwd = filepath;

  fail = expected.indexOf('fail-') === 0 ? expected.slice(5) : '';

  try {
    result = remark()
      .use(listType, config)
      .parse(input);

    t.snapshot(result);
  } catch (error) {
    if (!fail) {
      throw error;
    }

    fail = new RegExp(fail.replace(/-/, ' '), 'i');

    t.regex(error.message, fail, 'should fail on `' + expected + '`');
  }
}

fixtures.forEach(fixture => {
  const filepath = ROOT + '/' + fixture;
  const input = read(filepath + '/input.md', 'utf-8');

  test(`Fixtures: ${fixture}`, macro, input, fixture);
});
