function animate(transform, options) {
  
  // fired when transition is completed
  function done() {
    if (typeof options.complete === 'function') $.proxy(options.complete,this)();
    $(this).dequeue();
  }
  
  // whether giving value is relative
  function isRel(v) {
    return (typeof v === 'string' && v.match(/^\s*(\+|-)=\s*([0-9]+)\s*$/));
  }
  
  return function() {
    
    // default values
    var d = $(this).data('tween:animate') || {
      x: parseInt($(this).css('left')) || 0,
      y: parseInt($(this).css('top')) || 0
    };
    
    // set translate properties
    var transition = {
      left: isRel(options.props.x) ? options.props.x : options.props.x + d.x,
      top: isRel(options.props.y) ? options.props.y : options.props.y + d.y
    };
    
    // add non transform properties
    // i.e. width, height, color ...
    for (var k in options.props) {
      if ($.inArray(k, transform.properties) === -1) {
        transition[k] = options.props[k];
      }
    }
    
    // apply transition
    $(this).animate(transition, options.duration, options.easing, done);
    $(this).dequeue();
    
    $(this).data('tween:animate', d);
  }
}