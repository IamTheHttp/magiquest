module.exports = function (config) {
    config.resolve = {
        modules: ["./src", "node_modules", "./src/gameEngine"],
        extensions: ['.tsx', '.ts', '.js']
    };
    if (process.env.NODE_ENV === 'production') {
        config.entry.sw = process.cwd() + "/src/sw";
    }
    config.module.rules.push({
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    });
    if (config.entry[3]) {
        config.entry[3] = config.entry[3] + '.ts';
    }
    console.log(config);
    return config;
};
