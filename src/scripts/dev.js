const spawn = require('cross-spawn');
const { resolveBin } = require('../utils');

const scriptsBin = 'tee-scripts';

const scripts = {
  client: `${scriptsBin} dev/client`,
  server: `${scriptsBin} dev/server`,
};

const getConcurrentlyArgs = (scripts) => {
  return [
    '--kill-others-on-fail',
    '--handle-input',
    '--prefix', '[{name}]',
    '--names', Object.keys(scripts).join(','),
    ...Object.values(scripts).map(s => JSON.stringify(s)),
  ].filter(Boolean);
}

const bin = resolveBin('concurrently');

if (!bin) {
  throw new Error('未找到 concurrently 可执行文件，请先安装依赖.');
}

const result = spawn.sync(
  bin,
  getConcurrentlyArgs(scripts),
  {
    stdio: 'inherit'
  }
);

process.exit(result.status);