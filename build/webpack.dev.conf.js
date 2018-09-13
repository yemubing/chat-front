let webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devConfig = merge(baseWebpackConfig, {
  devServer: {
    contentBase: '../dist',
    host: 'localhost',
    port: 80,
    open: false,
    inline: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      // '/api': 'http://gw-test.zmlearn.com'
    },
    disableHostCheck: true
  },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  }
})

module.exports = devConfig
