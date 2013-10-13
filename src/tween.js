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
  
  return this.queue(task({
    props: props || {},
    duration: duration,
    delay: 0,
    easing: easing || 'ease',
    style: 'flat', // flat || preserve-3d
    property: 'all',
    complete: complete || function() {}
  }));
};

// debug options
$.fn.tween.debug = {
  animateType: ''
}