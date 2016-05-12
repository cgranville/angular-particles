var particlesComponent = function(particlesModule) {
  'use strict';

  particlesModule.component('particles', {
    bindings: {
      loadConfig: '@',
      loadCallback: '&',
      config: '=?'
    },
    controller: 'ParticlesController',
    controllerAs: 'ctrl'
  });
};

module.exports = particlesComponent;
