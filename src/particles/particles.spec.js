/*jshint strict:false */
describe('Particles ', function() {
  var $compile, $rootScope, element, canvas;

  beforeEach(function() {
    angular.mock.module('particles.js');
    angular.mock.inject(function(_$compile_,_$rootScope_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    });
    element = angular.element('<particles/>');
    angular.element(document.body).append(element);
  });

  afterEach(function(){
      element.remove();
  });

  it('should exist',function(){
    element = $compile(element)($rootScope);
    canvas = element[0].querySelector('canvas');
    expect(element[0].id).not.toBe('');
    expect(canvas).not.toBe(null);
  });

  it('should occupy the entire browser space', function() {
    element = $compile(element)($rootScope);
    canvas = element.find('canvas');
    expect(canvas.attr('width')).toEqual(window.innerWidth.toString());
    expect(canvas.attr('height')).toEqual(window.innerHeight.toString());
  });
});
