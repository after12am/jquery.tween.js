// alias of cssanimate of moving from current position of element
$.fn.to = function(to, duration, delay, easing, callback) {
  if (to.constructor !== Array) return this;
  return this.cssanimate({ to: to }, duration, delay, easing, callback);
};

// alias of cssanimate of rotating clockwise at a given degree
$.fn.rotate = function(rotate, duration, delay, easing, callback) {
  if (rotate.constructor !== Array) return this;
  return this.cssanimate({ rotate: rotate }, duration, delay, easing, callback);
};

// alias of cssanimate of increasing or decreases the size
$.fn.scale = function(scale, duration, delay, easing, callback) {
  if (scale.constructor !== Array) return this;
  return this.cssanimate({ scale: scale }, duration, delay, easing, callback);
};

// alias of cssanimate of turning in a given angle depending on the parameters given for the horizontal (X-axis) and the vertical (Y-axis) lines.
$.fn.skew = function(skew, duration, delay, easing, callback) {
  if (skew.constructor !== Array) return this;
  return this.cssanimate({ skew: skew }, duration, delay, easing, callback);
};