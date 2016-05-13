var particlesController = function(particlesModule) {
  'use strict';

  particlesModule.controller('ParticlesController', [
    '$scope',
    '$element',
    '$attrs',
    '$http',
    '$log',
    'ParticlesService',
    function(
      $scope,
      $element,
      $attrs,
      $http,
      $log,
      ParticlesService
    ) {
      var _this = this;
      this.pJSInstance = null;
      this.configWatcher = null;
      this.createPJSInstance = function() {
        var finalConfig = angular.merge({
          background: {
            color: '#272727',
            image: ''
          }
        }, _this.config);
        particlesJS(_this.uid, finalConfig);
        _this.pJSInstance = ParticlesService.getPJS(_this.uid);
        ParticlesService.updatePJSBackground(_this.pJSInstance);
      };

      this.$onInit = function() {
        //Add a unique id to the element if one is not provided.
        _this.uid = $attrs.id || (ParticlesService.uid() + '-' + ParticlesService.uid(true));

        $element.attr('id', _this.uid);
        $element.addClass('ng-particles');

        if (_this.loadConfig) {
          $http
            .get(_this.loadConfig)
            .then(function(response) {

              _this.config = response.data;
              _this.createPJSInstance();

              if (typeof _this.loadCallback === 'function') {
                _this.loadCallback();
              }

            }, function(response) {
              $log.log('Error pJS - XMLHttpRequest status: ' + response.status);
              $log.log('Error pJS - File config not found');
            });
        } else {
          _this.createPJSInstance();
          _this.configWatcher = $scope.$watch('ctrl.config', function(newValue, oldValue) {
            if (newValue !== oldValue) {
              ParticlesService.updatePJS(_this.pJSInstance, newValue);
            }
          }, true);
        }
      };

      this.$onDestroy = function() {
        if (_this.pJSInstance) {
          ParticlesService.destroyPJS(_this.pJSInstance);
        }
        //destroy configWatcher;
        if (_this.configWatcher) {
          _this.configWatcher();
        }
      };
    }
  ]);
};

module.exports = particlesController;
