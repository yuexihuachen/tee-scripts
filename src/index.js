#!/usr/bin/env node
const sync = require('resolve/sync');
const spawn = require('cross-spawn');
const path = require('path');

//来查找和解析模块的路径，找到并返回模块的结果
function attemptResolve(modulePath) {
  try {
    return sync(modulePath, { extensions: ['.js', '.ts'] })
  } catch (error) {
    return null
  }
}

const [executor, , script, ...args] = process.argv;

if (!script) {
  throw new Error('未指定脚本.');
}

const relativeScriptPath = path.join(__dirname, './scripts', script);
const scriptPath = attemptResolve(relativeScriptPath);

if (!scriptPath) {
  throw new Error(`无法识别 "${script}".`);
}

const result = spawn.sync(executor, [scriptPath, ...args], {
  stdio: 'inherit',
});
//程序结束信号，
if (['SIGKILL','SIGTERM'].includes(result.signal)) {
    //强制终止
  console.log(`命令 "${script}" 强制退出.`,);
  process.exit(1);
}

process.exit(result.status);
