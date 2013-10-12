function animate(transform, options) {
  
  // fired when transition is completed
  function done() {
    if (typeof options.complete === 'function') $.proxy(options.complete,this)();
    $(this).dequeue();
  }
    
  function wait(elem, style) {
    var i = 0, duration = vendorPropName(style, 'transition-duration');
    while (++i > 50) {
      if ($(elem).css(duration).match(/^0/)) break;
    }
  }
  
  var style = $('<div>')[0].style;
  
  // set translate properties
  var transition = {
    left: options.props.x,
    top: options.props.y
  };
  
  // add non transform properties
  // i.e. width, height, color ...
  for (var k in options.props) {
    if ($.inArray(k, transform.properties) === -1) {
      transition[k] = options.props[k];
    }
  }
  
  return function() {
    // apply transition
    $(this).animate(transition, options.duration, options.easing, done);
    $(this).dequeue();
  }
}