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

// specify between 0% (normal) to 100% (completely gray)
$.fn.grayscale = function(value, duration, delay, easing, callback) {
    if (value.constructor !== Number) return this;
    return this.cssanimate({ grayscale: value }, duration, delay, easing, callback);
};

// specify between 0% (normal) to 100% (completely sepia)
$.fn.sepia = function(value, duration, delay, easing, callback) {
    if (value.constructor !== Number) return this;
    return this.cssanimate({ sepia: value }, duration, delay, easing, callback);
};

// specify between 0% (completely gray) to 100% (normal)
$.fn.saturate = function(value, duration, delay, easing, callback) {
    if (value.constructor !== Number) return this;
    return this.cssanimate({ saturate: value }, duration, delay, easing, callback);
};

// specify angle to rotate the color wheel between 0deg to 100deg
$.fn.rotateHue = function(value, duration, delay, easing, callback) {
    if (value.constructor !== Number) return this;
    return this.cssanimate({ 'hue-rotate': value }, duration, delay, easing, callback);
};

// specify between 0% (normal) to 100% (completely invert)
$.fn.invert = function(value, duration, delay, easing, callback) {
    if (value.constructor !== Number) return this;
    return this.cssanimate({ invert: value }, duration, delay, easing, callback);
};

// specify between 0% (transparent) to 100% (normal)
$.fn.opacity = function(value, duration, delay, easing, callback) {
    if (value.constructor !== Number) return this;
    return this.cssanimate({ opacity: value }, duration, delay, easing, callback);
};

// specify between 0% (completely black) to 100% (normal)
$.fn.brighten = function(value, duration, delay, easing, callback) {
    if (value.constructor !== Number) return this;
    return this.cssanimate({ brightness: value }, duration, delay, easing, callback);
};

// specify between 0% (low) to 100% (high)
$.fn.contrast = function(value, duration, delay, easing, callback) {
    if (value.constructor !== Number) return this;
    return this.cssanimate({ contrast: value }, duration, delay, easing, callback);
};

// specify blur width with pixel
$.fn.blur = function(value, duration, delay, easing, callback) {
    if (value.constructor !== Number) return this;
    return this.cssanimate({ blur: value }, duration, delay, easing, callback);
};

// specify drop shadow
$.fn.dropShadow = function(value, duration, delay, easing, callback) {
    if (value.constructor !== Array) return this;
    return this.cssanimate({ 'drop-shadow': value }, duration, delay, easing, callback);
};

// specify custom shader
$.fn.shader = function(value, duration, delay, easing, callback) {
    throw '$.fn.shader() is not implemented';
    // return this.cssanimate({ 'shader': value }, duration, delay, easing, callback);
};
