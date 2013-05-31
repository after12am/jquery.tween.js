// alias of cssanimate of moving from current position of element
$.fn.to = function(to, duration, delay, easing, callback) {
    if (to.constructor !== Array) return this;
    if (to.length === 2) this.cssanimate({ x: to[0], y: to[1] }, duration, delay, easing, callback);
    if (to.length === 3) this.cssanimate({ x: to[0], y: to[1], z: to[2] }, duration, delay, easing, callback);
    return this;
};

// alias of cssanimate of rotating clockwise at a given degree
$.fn.rotate = function(rotate, duration, delay, easing, callback) {
    if (rotate.constructor !== Array) return this;
    if (rotate.length === 2) this.cssanimate({ rotatex: rotate[0], rotatey: rotate[1] }, duration, delay, easing, callback);
    if (rotate.length === 3) this.cssanimate({ rotatex: rotate[0], rotatey: rotate[1], rotatez: rotate[2] }, duration, delay, easing, callback);
    return this;
};

// alias of cssanimate of increasing or decreases the size
$.fn.scale = function(scale, duration, delay, easing, callback) {
    if (scale.constructor !== Array) return this;
    if (scale.length === 2) this.cssanimate({ scalex: scale[0], scaley: scale[1] }, duration, delay, easing, callback);
    if (scale.length === 3) this.cssanimate({ scalex: scale[0], scaley: scale[1], scalez: scale[2] }, duration, delay, easing, callback);
    return this;
};

// alias of cssanimate of turning in a given angle depending on the parameters given for the horizontal (X-axis) and the vertical (Y-axis) lines.
$.fn.skew = function(skew, duration, delay, easing, callback) {
    if (skew.constructor !== Array) return this;
    if (skew.length === 2) this.cssanimate({ skewx: skew[0], skewy: skew[1] }, duration, delay, easing, callback);
    return this;
};