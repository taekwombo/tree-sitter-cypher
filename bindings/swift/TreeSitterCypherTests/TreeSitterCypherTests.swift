import XCTest
import SwiftTreeSitter
import TreeSitterCypher

final class TreeSitterCypherTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_cypher())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Cypher grammar")
    }
}
