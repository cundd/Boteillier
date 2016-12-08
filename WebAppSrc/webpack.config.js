module.exports = {
    entry: "./JavaScripts/main.jsx",
    output: {
        path: __dirname + "/../WebAppDist/js",
        filename: "main.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};