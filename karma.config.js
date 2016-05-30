var path = require("path");
module.exports = function(config) {
  config.set({
    // frameworks to use
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      // only specify one entry point
      // and require all tests in there
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/particles.js/particles.js',
      'src/test-index.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/test-index.js': ['webpack']
    },
    //reporters
    reporters: ['spec', 'coverage'],

    webpack: {
      output: {
        libraryTarget: 'umd'
      },
      externals: [{
        'particles.js': {
          root: 'particlesJS'
        }
      }, {
        angular: {
          root: 'angular',
          commonjs2: 'angular',
          commonjs: 'angular',
          amd: 'angular'
        }
      }],
      module: {
        preLoaders: [{
          test: /\.css$/,
          include: path.resolve("./src/"),
          loader: 'style-loader!css-loader'
        }, {
          test: /\.js$/,
          include: path.resolve("./src/"),
          loader: "isparta"
        }]
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },
    coverageReporter: {
      type: "html",
      dir: "./coverage/"
    },
    plugins: [
      require("karma-webpack"),
      require("karma-jasmine"),
      require("karma-coverage"),
      require("karma-phantomjs-launcher"),
      require("karma-spec-reporter")
    ],
    singleRun: true,
    browsers: ['PhantomJS']
  });
};
