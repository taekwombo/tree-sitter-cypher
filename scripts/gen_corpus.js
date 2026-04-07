const path = require('path');
const fs = require('fs');

const PATHS = {
  legacy: {
    source: './openCypher/tools/grammar/src/test/resources/cypher-legacy.txt',
    target: './test/corpus/generated-legacy.txt',
  },
  source: './openCypher/tools/grammar/src/test/resources/cypher.txt',
  target: './test/corpus/generated.txt',

  getPaths(legacy) {
    return legacy
      ? [PATHS.legacy.source, PATHS.legacy.target]
      : [PATHS.source, PATHS.target];
  },
};

async function run () {
    const forceGenerate = process.argv.includes('--force');
    const generateLegacy = process.argv.includes('--legacy');
    const [sourcePath, targetPath] = PATHS.getPaths(generateLegacy);
    const { name: sourceName, ext: sourceExt } = path.parse(sourcePath);

    const stat = await fs.promises.stat(targetPath).catch(() => null);
    const testName = generateLegacy
      ? 'openCypher-legacy.txt: '
      : 'openCypher.txt: ';

    if (stat) {
        if (!forceGenerate) {
            console.log('Target path exists. Use "--force" flag to rewrite.');
            return;
        }

        console.log('Forcing rewrite of target path.');
    }

    const separator = '§';
    const source = fs.readFileSync(sourcePath).toString();
    const heading = '='.repeat(80);
    const body = '-'.repeat(80);
    const output = source
        .split(separator)
        .map((chunk, index) => {
            if (chunk.replace('\n', '').length === 0) {
                return null;
            }

            if (chunk.startsWith('\n')) {
                chunk = chunk.replace(/^\n+/, '');
            }

            return [
                heading,
                testName.concat(index),
                heading,
                '',
                chunk,
                '',
                body,
                '()',
                ''
            ].join('\n');
        })
        .filter((c) => c !== null)
        .join('\n');

    fs.writeFileSync(
        targetPath,
        output,
    );
}

run();
