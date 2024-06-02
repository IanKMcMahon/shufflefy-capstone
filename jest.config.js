module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testEnvironment: "node",
  transformIgnorePatterns: [
    "node_modules/(?!(uuid)/)" // Add any other ES6 module packages you need here
  ],
};
