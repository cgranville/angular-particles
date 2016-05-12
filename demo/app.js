angular
  .module('particles.test', ['particles.js'])
  .controller('MainController', ['$scope','$timeout', function($scope,$timeout) {
    $scope.config = {
      'particles': {
        'number': {
          'value': 70
        },
        'color': {
          'value': ['#FF9900', '#424242', '#BCBCBC', '#3299BB']
        },
        'opacity': {
          'random': true
        },
        'size': {
          'value': 10,
          'random': true,
          'anim': {
            'enable': true,
            'speed': 2,
            'size_min': 0.1
          }
        },
        'line_linked': {
          'enable': false
        }
      },
      'interactivity': {
        'events': {
          'onhover': {
            'enable': false,
          },
          'onclick': {
            'enable': false,
          }
        }
      },
      'background': {
        'color': '#272727'
      }
    };

    $timeout(function(){
      $scope.config.particles.number.value = 1000;
      $scope.config.particles.size.value = 1;
      $scope.config.background.color = '#000000';
      $scope.config.particles.line_linked.enable = false;
      $scope.config.interactivity.events.onclick.enable = true;
      $scope.config.interactivity.events.onclick.mode = 'push';
      $scope.config.background.image = 'https://d14xs1qewsqjcd.cloudfront.net/assets/bg-header-star.jpg';
    },5000);
  }]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['particles.test']);
});
