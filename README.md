tree-sitter-cypher
================

Cypher grammar for [tree-sitter].

### Development

#### Initialising repository

Create `test.cql` file if you want to run test locally against single file using `test:dev` npm script:

    echo "// Comment" > test.cql

#### NPM Scripts

Install the dependencies:

    npm install

Build parser

    npm run build

Run the tests:

    npm run test

Run the build and tests in watch mode:

    npm run test:watch

Test parser in debug mode against `test.cql` file:

    npm run test:dev

#### References
* [opencypher]
* [opencypher/tools] repo

[tree-sitter]: https://github.com/tree-sitter/tree-sitter
[opencypher]: https://opencypher.org/resources/
[openCypher/tools]: https://github.com/opencypher/openCypher/blob/a43606b91d7405f068b068c3eeb984eac8963e28/tools/grammar/src/main/java/org/opencypher/grammar/CharacterSet.java

