import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.cypher.TreeSitterCypher;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterCypherTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterCypher.language()));
    }
}
