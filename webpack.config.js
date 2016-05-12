var path = require('path');
module.exports = {
  entry: './src/particles.js',
  output: {
    path: './lib',
    publicPath: "/lib/",
    filename: 'bundle.js',
    libraryTarget: "umd"
  },
  externals: [{
    angular: {
      root: 'angular',
      commonjs2: 'angular',
      commonjs: 'angular',
      amd: 'angular'
    }
  }],
  devServer: {
    contentBase: './demo/',
    quiet:true
  },
  module: {
    preLoaders: [{
      test: /\.js$/, // include .js files
      exclude: /node_modules/, // exclude any and all files in the node_modules folder
      loader: "jshint-loader"
    }],
    loaders: [{
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader'
    }]
  },
  jshint: {
    curly: true,
    eqeqeq: true,
    globals: {
      'angular': true,
      'window': true,
      'particlesJS': true,
      'console': true,
      'document': true,
      'window': true
    },
    quotmark: 'single',
    strict: true,
    undef: true,
    unused: true,
    jasmine: true
  }
};
