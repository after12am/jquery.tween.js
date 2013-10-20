$.fn.tween = function(props, duration, easing, complete) {
  
  if (typeof duration === 'function') {
    complete = duration;
    duration = undefined;
  }
  
  if (typeof easing === 'function') {
    complete = easing;
    easing = undefined;
  }
  
  // 'fast' => 200, 'slow' => 600, default => 400
  switch (typeof duration) {
    case 'number': break;
    case 'string': duration = $.fx.speeds[duration] || $.fx.speeds._default; break;
    default: duration = $.fx.speeds._default; break;
  }
  
  var _props = $.extend(true, {}, props);
  for (var k in props) {
    switch (k) {
      case 'rotate': _props.rotatez = props[k]; break;
      case 'scale': _props.scalex = _props.scaley = props[k]; break;
      case 'skew': _props.skewx = _props.skewy = props[k]; break;
      default: continue;
    }
    delete _props[k]; 
  }
  
  return this.queue(task({
    props: _props || {},
    duration: duration,
    delay: 0,
    easing: easing || 'def',
    style: 'flat', // flat || preserve-3d
    property: 'all',
    complete: complete || function() {}
  }));
};

// debug options
$.fn.tween.debug = {
  animateType: ''
}