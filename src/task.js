function task(options) {
  
  var animateType = transitionEnd ? 'transition': 'animation';
  
  return function() {
    
    // update transformation values
    var transform = $(this).data('tween:transform') || new Transform();
    transform.update(options.props);
    $(this).data('tween:transform', transform);
    
    switch (animateType) {
      case 'transition': $.proxy(transit(transform, options), this)(); break;
      case 'animation': $.proxy(animate(transform, options), this)(); break;
    }
  }
}