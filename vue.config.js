module.exports = {
  publicPath: `${process.cwd()}/dist/`,
  pluginOptions: {
    electronBuilder: {
      preload: "electron/dist/preload.js",
    },
  },
};
