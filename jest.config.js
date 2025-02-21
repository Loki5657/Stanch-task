module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(react-dnd|dnd-core|@react-dnd|react-router-dom)/).+\\.js$", // Allow Jest to transform ESM modules
  ],
  moduleNameMapper: {
    "\\.(css|scss|sass|less)$": "identity-obj-proxy", // Mock CSS imports
  },
};
