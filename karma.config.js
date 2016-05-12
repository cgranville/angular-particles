module.exports = function(config) {
  config.set({
    // frameworks to use
    frameworks: ['jasmine'],
    files: [
      // only specify one entry point
      // and require all tests in there
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/particles.js',
      'src/test-index.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/particles.js': ['webpack'],
      'src/test-index.js': ['webpack']
    },
    //reporters
    reporters: ['spec', 'coverage'],

    // webpack: {
    //   // karma watches the test entry points
    //   // (you don't need to specify the entry option)
    //   // webpack watches dependencies
    //   // webpack configuration
    // },
    webpack: require('./webpack.config.js'),

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },
    plugins: [
      require("karma-webpack"),
      require("karma-jasmine"),
      require("karma-coverage"),
      require("karma-chrome-launcher"),
      require("karma-spec-reporter")
    ],
    singleRun: false,
    browsers: ['Chrome']
  });
};
