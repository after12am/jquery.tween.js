function task(options) {
  
  var animateType = transitionEnd ? 'transition': 'animation';
  
  return function() {
    var transform = $(this).data('tween:transform') || new Transform();
    transform.update(options.props);
    
    switch (animateType) {
      case 'transition': $.proxy(transit(transform, options), this)(); break;
      case 'animation': $.proxy(animate(transform, options), this)(); break;
    }
    
    $(this).data('tween:transform', transform);
  }
}