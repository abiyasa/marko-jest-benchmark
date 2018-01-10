// eslint-disable-next-line import/no-extraneous-dependencies
const BPromise = require('bluebird');
const rimraf = require('rimraf');

const rimrafPromisified = BPromise.promisify(rimraf);

const FILES = {
  tmp: 'tmp',
  beans: '.beans',
  cache: '.cache',
  log: 'log',
  static: 'static',
  telemetry: '.telemetry.json',
  mocha: ['mocha.xunit'],
  marko: [
    './components/**/*.marko.js'
  ]
};

process.stdout.write('Cleaning up');

BPromise
  .map(Object.keys(FILES), key => removeFile(FILES[key]))
  .then(() => process.stdout.write('done\n'));

function removeFile(pattern) {
  return Array.isArray(pattern) ?
    BPromise.map(pattern, removeFile) :
    rimrafPromisified(pattern).then(putDot).catch(putX);
}

function putDot() {
  process.stdout.write('.');
}

function putX() {
  process.stdout.write('x');
}
