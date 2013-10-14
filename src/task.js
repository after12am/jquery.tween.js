function task(options) {
  
  var animateType = $.fn.tween.debug.animateType || (transitionEnd ? 'transition': 'animation');
  
  return function() {
    switch (vendorPrefix) {
      case 'o': return animate(this, options);
    }
    
    switch (animateType) {
      case 'transition': return transit(this, options);
      case 'animation': return animate(this, options);
    }
  }
}