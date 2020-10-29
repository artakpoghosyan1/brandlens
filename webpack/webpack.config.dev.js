const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    devServer: {
        contentBase: '../dist',
        historyApiFallback: true,
    },
    mode: 'development',
    devtool: 'inline-source-map',
})
