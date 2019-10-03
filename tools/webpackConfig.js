module.exports = function(config){
  config.resolve = {
    modules: ["./src", "node_modules"]
  };

  if (process.env.NODE_ENV === 'production') {
    config.entry.sw = `${process.cwd()}/src/sw`;
  }

  return config;
};