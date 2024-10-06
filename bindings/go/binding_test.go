package tree_sitter_cypher_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_cypher "git+github.com/taekwombo/tree-sitter-cypher.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_cypher.Language())
	if language == nil {
		t.Errorf("Error loading Cypher grammar")
	}
}
