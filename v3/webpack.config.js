const Dotenv = require('dotenv-webpack')
const path = require('path')
const webpack = require('webpack')
// const WebpackDevServer = require('webpack-dev-server')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    index: ['./js/index.js', './css/index.scss']
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].min.js',
    publicPath: path.join(__dirname, '/')
  },
  devServer: {
    contentBase: path.join(__dirname, '/'),
    hot: true,
    debug: true,
    compress: true,
    port: 5000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1'
        })
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            ['es2015']
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      },
      mangle: {
        except: ['$'],
        screw_ie8: true,
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new Dotenv()
  ]
}

module.exports = config
