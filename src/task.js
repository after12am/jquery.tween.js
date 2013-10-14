function task(options) {
  
  var animateType = $.fn.tween.debug.animateType || (transitionEnd ? 'transition': 'animation');
  
  return function() {
    switch (animateType) {
      case 'transition': transit(this, options); break;
      case 'animation': animate(this, options); break;
    }
  }
}