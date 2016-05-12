//Require angular
var angular = require('angular');
//This will add particles to the global window object
require('particles.js');
//Require particles.css
require('./particles.css');
//Create the angular particles module
var particlesModule = angular.module('particles.js', []);
//Particles Service
require('./particles.service.js')(particlesModule);
//Particles Controller
require('./particles.controller.js')(particlesModule);
//Particles component
require('./particles.component.js')(particlesModule);
//Export the name of the module
module.exports = particlesModule.name;
