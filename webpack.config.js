const path = require('path');
const webpack = require('webpack');
var plugins = [];
var sourceMap = true;
var outputFileName = 'bundle.js';

//If production mode
if (process.argv[2] === '--production') {
  outputFileName = 'bundle.min.js';
  sourceMap = false;
  //UglifyJS plugin
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true
    }
  }))
}

module.exports = {
  entry: './src/particles.js',
  output: {
    path: './lib',
    publicPath: '/lib/',
    filename: outputFileName,
    libraryTarget: 'umd'
  },
  externals: [{
    angular: {
      root: 'angular',
      commonjs2: 'angular',
      commonjs: 'angular',
      amd: 'angular'
    }
  }],
  devtool: sourceMap ? 'source-map' : null,
  devServer: {
    contentBase: './demo/'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      loader: 'jshint-loader'
    }],
    loaders: [{
      test: /\.css$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      loader: 'style-loader!css-loader'
    }]
  },
  plugins: plugins,
  jshint: {
    curly: true,
    eqeqeq: true,
    globals: {
      'angular': true,
      'window': true,
      'particlesJS': true,
      'console': true
    },
    browser: true,
    quotmark: 'single',
    strict: true,
    undef: true,
    unused: true,
    jasmine: true
  }
};
