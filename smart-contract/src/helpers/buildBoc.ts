import * as fs from 'fs';
import * as path from 'path';

import { runTolkCompiler } from '@ton/tolk-js';

async function compileTolk(entryFile: string, outName: string) {
  console.log(`Compiling ${outName}...`);

  const result = await runTolkCompiler({
    entrypointFileName: path.resolve(entryFile),
    fsReadCallback: (filePath: string) => {
      const full = path.resolve(path.dirname(entryFile), filePath);
      return fs.readFileSync(full, 'utf8');
    },
  });

  if (result.status === 'error') {
    console.error(`Compilation failed for ${outName}:`, result.message);
    return;
  }

  const buildDir = path.resolve('src/utils/boc');
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir);
  }
  const bocPath = path.join(buildDir, `${outName}.boc`);
  fs.writeFileSync(bocPath, Buffer.from(result.codeBoc64, 'base64'));

  console.log(`${outName} compiled successfully! → ${bocPath}`);
}

async function init() {
  await compileTolk('src/contracts/tolk/sbt_collection.tolk', 'sbt_collection');
  await compileTolk('src/contracts/tolk/sbt_item.tolk', 'sbt_item');
  console.log('All contracts compiled!');
}

void init().catch((e) => {
  console.error('Error:', e);
  process.exit(1);
});
