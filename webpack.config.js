const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].[chunkhash].css');
const extractJSON = new ExtractTextPlugin('olympics_2008_medalists.json');

const TARGET = process.env.npm_lifecycle_event;
const stylePath = path.join(__dirname, 'app', 'main.scss');
const appPath = path.join(__dirname, 'app');
const buildPath = path.join(__dirname, 'build');

function configSwitch(target) {

  const module = {
    module: {}
  };

  switch(target) {
    case 'test':
    case 'test:tdd':
      module.module = {
        rules: [{
          test: /\.(js|jsx)$/,
          use: [{
            loader: 'babel-loader?cacheDirectory'
          }]
        }]
      }

      break;

    case 'build':
      module.module = {
        use: [
          {
            test: /\.(js|jsx)$/,
            use: ['babel-loader?cacheDirectory', 'eslint-loader'],
            include: appPath
          },
          // json src file
          {
            test: /\.json$/,
            use: extractJSON.extract({ use: 'file-loader' }),
            include: path.join(__dirname, 'public')
          },
          // Extract CSS during build
          {
            test: /\.scss$/,
            use: extractCSS.extract({ fallback: 'style-loader', use: 'css-loader' })
          }
        ]
      };

      module.entry = {
        vendor: [
          'react', 'react-dom'
        ]
      };

      module.plugins = [
        new CleanWebpackPlugin([buildPath], {
          root: process.cwd()
        }),
        new webpack.optimize.CommonsChunkPlugin({
          names: ['vendor', 'manifest'],

          // options.name modules only
          minChunks: Infinity
        }),
        // Output extracted CSS to a file
        extractCSS,
        extractJSON
      ]

      module.output = {
        path: path.join(__dirname, 'build'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js'
      }

    default:
      module.module = {
        rules: [{
          test: /\.(js|jsx)$/,
          use: [
            "babel-loader?cacheDirectory",
            "eslint-loader"
          ]
        }, {
          test: /\.scss$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader"
          ]
        }]
      };

      module.entry = {
      };

      module.devServer = {
        contentBase: path.join(__dirname, "public")
        // host: 'localhost',
        // port: 9000
      };
  }

  return module;
}

const common = {
  entry: {
    app: './app/index.jsx',
    style: './app/main.scss'
  },
  output: {
    path: buildPath,
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
  devtool: 'source-map'
};

const config = merge(common, configSwitch(TARGET));
console.log(config.module);

module.exports = config;
