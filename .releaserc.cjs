module.exports = {
  branches: ["main"],
  repositoryUrl: "https://github.com/react-chess/chessground.git",
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          { type: "docs", scope: "README", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "chore", release: "patch" },
        ],
      },
    ],
  ],
};
