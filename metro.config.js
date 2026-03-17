const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  minifierConfig: {
    ...config.transformer?.minifierConfig,
    keep_fnames: true,
  },
};

config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    "regenerator-runtime": path.resolve(
      __dirname,
      "node_modules/regenerator-runtime"
    ),
  },
};

module.exports = config;
