function task(options) {
  return function() {
    
    var hasTransition = (vendorPropName(this.style, 'transition') in this.style);
    var animateType = $.fn.tween.debug.animateType || (hasTransition ? 'transition': 'animation');
    
    switch (vendorPrefix) {
      case 'o': return animate(this, options);
    }
    
    switch (animateType) {
      case 'transition': return transit(this, options);
      case 'animation': return animate(this, options);
    }
  }
}