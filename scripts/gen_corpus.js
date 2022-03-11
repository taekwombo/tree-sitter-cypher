const path = require('path');
const fs = require('fs');

const sourcePath = path.resolve(
    __dirname,    
    '../openCypher/tools/grammar/src/test/resources/cypher.txt',
);

const targetPath = path.resolve(
    __dirname,
    '../test/corpus/generated.txt',
);

async function run () {
    const stat = await fs.promises.stat(targetPath).catch(() => null);

    const forceGenerate = process.argv.includes('--force');

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

            return [
                heading,
                'openCypher.txt: '.concat(index),
                heading,
                chunk,
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
