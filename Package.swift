// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterCypher",
    products: [
        .library(name: "TreeSitterCypher", targets: ["TreeSitterCypher"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterCypher",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterCypherTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterCypher",
            ],
            path: "bindings/swift/TreeSitterCypherTests"
        )
    ],
    cLanguageStandard: .c11
)
