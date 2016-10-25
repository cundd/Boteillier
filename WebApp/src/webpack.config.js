module.exports = {
    entry: "./JavaScripts/main.js",
    output: {
        path: __dirname + "/../dist/js",
        filename: "main.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};