var particlesService = function(particlesModule) {
  'use strict';

  particlesModule.factory('ParticlesService', function() {
    var makeid = function(useNumbers) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      if (useNumbers) {
        possible += '1234567890';
      }
      for (var i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    var getInstanceIndex = function(elementId) {
      for (var i = 0, l = window.pJSDom.length; i < l; i++) {
        if (window.pJSDom[i].pJS.canvas.el.parentNode.id === elementId) {
          return i;
        } else {
          continue;
        }
      }
      return -1;
    };

    var getPJSInstance = function(elementId) {
      var instanceIndex = getInstanceIndex(elementId);
      return {
        instance: window.pJSDom[instanceIndex].pJS,
        index: instanceIndex
      };
    };

    var updateElBackground = function(instanceObj) {
      var pJSInstance = instanceObj.instance;
      var canvasParent = pJSInstance.canvas.el.parentNode;
      canvasParent.style.background = null;
      canvasParent.style.backgroundImage = pJSInstance.background.image ? 'url("' + pJSInstance.background.image + '")' : 'none';
      canvasParent.style.backgroundColor = pJSInstance.background.color || 'transparent';
    };

    var updatePJSInstance = function(instanceObj, newValue) {
      var pJSInstance = instanceObj.instance;
      angular.merge(pJSInstance.background, newValue.background);
      angular.merge(pJSInstance.interactivity, newValue.interactivity);
      angular.merge(pJSInstance.particles, newValue.particles);
      //Individual tmp object properties
      pJSInstance.tmp.obj.size_value = pJSInstance.particles.size.value;
      pJSInstance.tmp.obj.size_anim_speed = pJSInstance.particles.size.anim.speed;
      pJSInstance.tmp.obj.line_linked_distance = pJSInstance.particles.line_linked.distance;
      pJSInstance.tmp.obj.line_linked_width = pJSInstance.particles.line_linked.width;
      pJSInstance.tmp.obj.move_speed = pJSInstance.particles.move.speed;
      pJSInstance.tmp.obj.mode_grab_distance = pJSInstance.interactivity.modes.grab.distance;
      pJSInstance.tmp.obj.mode_bubble_distance = pJSInstance.interactivity.modes.bubble.distance;
      pJSInstance.tmp.obj.mode_bubble_size = pJSInstance.interactivity.modes.bubble.size;
      pJSInstance.tmp.obj.mode_repulse_distance = pJSInstance.interactivity.modes.repulse.distance;
      updateElBackground(instanceObj);
      pJSInstance.fn.particlesRefresh();
    };

    var destroyPJSInstance = function(instanceObj) {
      window.cancelAnimationFrame(instanceObj.instance.fn.drawAnimFrame);
      //remove background styles
      var canvasParent = instanceObj.instance.canvas.el.parentNode;
      canvasParent.style.background = null;
      canvasParent.style.backgroundImage = null;
      canvasParent.style.backgroundColor = null;

      //remove the canvas element;
      instanceObj.instance.canvas.el.remove();

      //Remove instance from the window object
      if (instanceObj.index > -1) {
        window.pJSDom.splice(instanceObj.index, 1);
      }
      instanceObj = null;
    };

    return {
      uid: makeid,
      getPJS: getPJSInstance,
      destroyPJS: destroyPJSInstance,
      updatePJS: updatePJSInstance,
      updatePJSBackground: updateElBackground
    };
  });
};

module.exports = particlesService;
