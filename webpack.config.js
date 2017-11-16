const webpack = require('webpack');

module.exports = {
    entry: './app/app.js',
    output: {
        path: __dirname + '/public', 
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        contentBase: './public',
        port: 3333,
        historyApiFallback: true
    },

    module: {
        loaders: [
            { test: /.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015', 'react'] } },
            { test: /\.css$/, loader:'style-loader!css-loader' },
            { test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/, loader: 'url-loader', options: { limit: 10000 } }     
        ]
    }
 
}