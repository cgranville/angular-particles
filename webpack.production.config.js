var config = require('./webpack.config.js');
config.output.filename = 'bundle.min.js';
module.exports = config;
