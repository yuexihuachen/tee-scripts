const path = require('path');
const spawn = require('cross-spawn');
const { resolveBin } = require('../utils');

const here = p => path.join(__dirname, p);

const FILES_TO_APPLY = ['**/*.+(js|jsx|json|css|scss|ts|tsx|md)'];
const args = process.argv.slice(2);

const config = ['--config', here('../config/prettier.config.js')];

const ignore = ['--ignore-path', here('../config.prettierignore')];

const write = args.includes('--no-write') ? [] : ['--write'];

const relativeArgs = args.map(a => a.replace(`${process.cwd()}/`, ''));

const bin = resolveBin('prettier');

if (!bin) {
  throw new Error('未找到 prettier 可执行文件，请先安装依赖.');
}

const result = spawn.sync(
  bin,
  [...config, ...ignore, ...write, ...FILES_TO_APPLY].concat(relativeArgs),
  { stdio: 'inherit' },
);

process.exit(result.status);