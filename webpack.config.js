const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

function babelLoad(target) {
  const module = {
    module: {}
  };

  switch(target) {
    case 'test':
    case 'test:tdd':
      module.module = {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            loaders: ['babel-loader?cacheDirectory'],
            include: [
              path.join(__dirname, 'app'),
              path.join(__dirname, 'test')
            ]
          }
        ]
      };

      break;

    default:
      module.module = {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            loaders: ['babel-loader?cacheDirectory', 'eslint-loader'],
            include: path.join(__dirname, 'app')
          },
          {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
            include: path.join(__dirname, 'app')
          }
        ]
      };

      module.entry = {
        style: path.join(__dirname, 'app', 'main.css')
      };
  }

  return module;
}

const common = {
  entry: {
    app: './app/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      title: '2008 Olympic Medals',
      appMountId: 'app',
      inject: false
    })
  ],
  stats: {
    colors: true
  },
  devServer: {
    contentBase: path.join(__dirname, "public")
  },
  devtool: 'source-map'
};

const config = merge(common, babelLoad(TARGET));

module.exports = validate(config, {
  quiet: true
});
