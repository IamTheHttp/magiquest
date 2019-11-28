module.exports = function (jestConfig) {
  //collectCoverageFrom is already an array in the default configuration we use, but it's always safe to ensure it exists beforehand
  if (!jestConfig.collectCoverageFrom) {
    jestConfig.collectCoverageFrom = [];
  }

  //let's prevent Jest from collecting code coverage from the examples directory - we don't plan on testing it anyway.
  jestConfig.collectCoverageFrom.push("!src/polyfill/*.*");
  jestConfig.collectCoverageFrom.push("!src/liveExample.js");
  jestConfig.collectCoverageFrom.push("!src/index.js");
  jestConfig.collectCoverageFrom.push("!src/levels/*.*");

  jestConfig.setupFiles = jestConfig.setupFiles || [];

  jestConfig.setupFiles.push("<rootDir>/src/polyfill/rAF.js");
  jestConfig.setupFiles.push("jest-canvas-mock");

  jestConfig.moduleDirectories = ["./src", "./src/gameEngine", "node_modules"];
  jestConfig.bail = true;
  
  jestConfig.testRegex = "test.js$";
  jestConfig.coverageThreshold.global = {
    "branches": 80,
    "functions": 80,
    "lines": 85,
    "statements": 85
  };
  return jestConfig;
};