$.fn.cssanimate = function(params, duration, delay, ease, callback) {
  // If params property is not specified, the argument is initialized.
  params = params || {};
  
  var property, style;
  
  if (typeof duration === 'function') {
    callback = duration;
    duration = undefined;
  }
  
  // whether loopback
  if (params.constructor === Array) {
    this.cache = this.cache || new Style($(this));
    this.cssanimate.loopback.has_callback = !!callback;
    return this.cssanimate.loopback(this, params, callback);
  }
  
  if (typeof delay === 'function') {
    callback = delay;
    delay = undefined;
  }
  
  if (typeof ease === 'function') {
    callback = ease;
    ease = undefined;
  }
  
  if (params.duration !== undefined) {
    duration = params.duration;
    delete params.duration;
  }
  
  if (params.delay !== undefined) {
    delay = params.delay;
    delete params.delay;
  }
  
  if (params.ease !== undefined) {
    ease = params.ease;
    delete params.ease;
  }
  
  if (params.property !== undefined) {
    property = (params.property.constructor === Array) ? params.property.join(',') : params.property;
    delete params.property;
  }
  
  var transition = {
    duration: typeof duration === 'number' ? duration : 400, // Specifies the amount of time it takes to change.
    delay: +delay || 0, // Specifies whether the change begins when.
    ease: Ease[ease] || ease || 'ease-in-out', // Specifies the timing of the change.
    style: style || 'flat', // flat || preserve-3d
    property: property || 'all' // Specifies the name of the css properties that apply the transition effect.
  };
  
  return this.queue(function() {
    // cache current property setting
    this.cache = this.cache || new Style($(this));
    // add to $.fn.queue() to animate serially after building appropriate css properties
    this.cache.compile(transition, params).queue(callback);
  });
};

// hook of $.fn.stop
$.fn._stop = $.fn.stop;
$.fn.stop = function(clearQueue, jumpToEnd) {
  if (this.cssanimate.loopback.has_callback) this.cssanimate.stop = true;
  return $.fn._stop.apply(this, arguments);
}

// When you want to stop the loop, call $.fn.stop(true, true).
$.fn.cssanimate.loopback = function(elem, cssanimates, callback) {
  var _ = [];
  // We have to copy deeply for avoid that the values is overridden
  cssanimates.forEach(function(args, i) {
    _[i] = $.extend(true, {}, args);
  });
  _.forEach(function(args, i) {
    // no problem even if some of the arguments are undefined
    elem.cssanimate(args[0], args[1], args[2], args[3], args[4]);
  });
  // Add function which loopback to the end of the queue
  // And it is ok even if call $.fn.stop(true, true) in the callback function of the loopback
  elem.queue(function() {
    this.step = ++this.step || 1;
    if (typeof callback === 'function') $.proxy(callback, elem)(this.step);
    if (elem.cssanimate.stop) {
      elem.cssanimate.stop = false;
      elem.dequeue();
      return elem;
    }
    // initialize the preset values because taking over the value over the animations
    this.cache = new Style($(this));
    elem.cssanimate(cssanimates, callback);
    elem.dequeue();
  });
  return elem;
};