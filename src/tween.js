$.fn.tween = function(props, duration, easing, complete) {
  
  if (typeof duration === 'function') {
    complete = duration;
    duration = undefined;
  }
  
  if (typeof easing === 'function') {
    complete = easing;
    easing = undefined;
  }
  
  /*
  // In case of loopback
  if (props.constructor === Array) {
    this.tween.loopback.has_callback = !!complete;
    return this.tween.loopback(this, props, complete);
  }*/
  
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
    complete: complete
  }));
};

// debug options
$.fn.tween.debug = {
  animateType: ''
}

/*
// When you want to stop the loop, call $.fn.stop(true, true).
$.fn.tween.loopback = function(elem, queues, callback) {
  var _ = [];
  // We have to copy deeply for avoid that the values is overridden
  queues.forEach(function(args, i) {
    _[i] = $.extend(true, {}, args);
  });
  _.forEach(function(args, i) {
    // no problem even if some of the arguments are undefined
    elem.tween(args[0], args[1], args[2], args[3], args[4]);
  });
  // Add function which loopback to the end of the queue
  // And it is ok even if call $.fn.stop(true, true) in the callback function of the loopback
  elem.queue(function() {
    this.step = ++this.step || 1;
    if (typeof callback === 'function') $.proxy(callback, elem)(this.step);
    if (elem.tween.stop) {
      elem.tween.stop = false;
      elem.dequeue();
      return elem;
    }
    // initialize the preset values because taking over the value over the animations
    this.cache = new Style($(this));
    elem.tween(queues, callback);
    elem.dequeue();
  });
  return elem;
}

// hook of $.fn.stop
$.fn._stop = $.fn.stop;
$.fn.stop = function(clearQueue, jumpToEnd) {
  if (this.tween.loopback.has_callback) this.tween.stop = true;
  return $.fn._stop.apply(this, arguments);
}
*/