module.exports = function(config){
  config.resolve = {
    modules: ["./src", "./src/gameEngine/components", "node_modules"]
  };

  if (process.env.NODE_ENV === 'production') {
    config.entry.sw = `${process.cwd()}/src/sw`;
  }

  return config;
};