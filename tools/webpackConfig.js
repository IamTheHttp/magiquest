module.exports = function (config) {
  config.resolve.modules = ['./src', 'node_modules', './src/gameEngine'];

  if (process.env.NODE_ENV === 'production') {
    // config.entry.sw = `${process.cwd()}/src/sw`;
  }

  if (process.env.NODE_ENV === 'development' && config.devServer) {
    config.devServer.hot = false;
    config.devServer.inline = false;
    config.devServer.liveReload = false;
  }

  return config;
};
