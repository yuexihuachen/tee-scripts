const spawn = require('cross-spawn');
const { resolveBin } = require('../utils');

const bin = resolveBin('vite');

if (!bin) {
  throw new Error('未找到 vite 可执行文件，请先安装依赖.');
}

const result = spawn.sync(
  bin,
  ['build','--mode', 'production'],
  { stdio: 'inherit', cwd: './client' },
);

process.exit(result.status);