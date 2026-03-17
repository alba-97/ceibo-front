const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  minifierConfig: {
    ...config.transformer?.minifierConfig,
    keep_fnames: true,
  },
};

const regeneratorRuntimePath = require.resolve("regenerator-runtime/runtime");

config.resolver = {
  ...config.resolver,
  resolveRequest: (context, moduleName, platform) => {
    if (
      moduleName === "regenerator-runtime" ||
      moduleName === "regenerator-runtime/runtime" ||
      moduleName === "@babel/runtime/regenerator"
    ) {
      return { filePath: regeneratorRuntimePath, type: "sourceFile" };
    }
    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = config;
