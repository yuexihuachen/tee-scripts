 // "dev": "bun run --hot src/index.ts"

 const spawn = require('cross-spawn');
 const { resolveBin } = require('../utils');
 
 const bin = resolveBin('bun');
 
 if (!bin) {
   throw new Error('未找到 bun 可执行文件，请先安装依赖.');
 }
 
 const result = spawn.sync(
   bin,
   ['run', './src/index.ts'],
   { stdio: 'inherit', cwd: './server' },
 );
 
 process.exit(result.status);