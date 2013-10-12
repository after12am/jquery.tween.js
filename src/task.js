function task(options) {
  
  var animateType = transitionEnd ? 'transition': 'animation';
  
  return function() {
    switch (animateType) {
      case 'transition': $.proxy(transit(options), this)(); break;
      case 'animation': $.proxy(animate(options), this)(); break;
    }
  }
}