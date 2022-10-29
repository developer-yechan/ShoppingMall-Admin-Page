const { defaults } = require("jest-config");

module.exports = async () => {
  return {
    verbose: true,
    bail: 1,
    moduleFileExtensions: [...defaults.moduleFileExtensions, "mts", "cts"],
  };
};
