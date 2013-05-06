$.fn.translateX = function(x, duration, delay, easing, callback) {
    
    var params = {
        x: x
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.translateY = function(y, duration, delay, easing, callback) {
    
    var params = {
        y: y
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.translateZ = function(z, perspective, duration, delay, easing, callback) {
    
    var params = {
        z: z,
        perspective : perspective
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.translate = function(x, y, duration, delay, easing, callback) {
    
    var params = {
        x: x,
        y: y
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.translate3d = function(x, y, z, perspective, duration, delay, easing, callback) {
    
    var params = {
        x: x,
        y: y,
        z: z,
        perspective: perspective
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.scaleX = function(scalex, duration, delay, easing, callback) {
    
    var params = {
        scalex: scalex
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.scaleY = function(scaley, duration, delay, easing, callback) {
    
    var params = {
        scaley: scaley
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.scaleZ = function(scalez, perspective, duration, delay, easing, callback) {
    
    throw new Error('not implemented');
    
    /*
    var params = {
        scalez: scalez,
        perspective: perspective
    };
    
    this.smoosy(params, duration, delay, easing, callback);
    */
};

$.fn.scale = function(scalex, scaley, duration, delay, easing, callback) {
    
    var params = {
        scalex: scalex,
        scaley: scaley
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.scale3d = function(scalex, scaley, scalez, perspective, duration, delay, easing, callback) {
    
    throw new Error('not implemented');
    
    /*
    var params = {
        scale: [scalex, scaley, scalez]
    };
    
    this.smoosy(params, duration, delay, easing, callback);
    */
};

$.fn.rotateX = function(rotatex, duration, delay, easing, callback) {
    
    var params = {
        rotatex: rotatex
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.rotateY = function(rotatey, perspective, duration, delay, easing, callback) {
    
    var params = {
        rotatey: rotatey,
        perspective: perspective
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.rotateZ = function(rotatez, duration, delay, easing, callback) {
    
    var params = {
        rotatez: rotatez
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.rotate = function(rotate, duration, delay, easing, callback) {
    
    var params = {
        rotate: rotate
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.rotate3d = function(x, y, z, rotate, perspective, duration, delay, easing, callback) {
    
    var params = {
        rotate: [x, y, z, rotate],
        perspective: perspective
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.skewX = function(skewx, duration, delay, easing, callback) {
    
    var params = {
        skewx: skewx
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.skewY = function(skewy, duration, delay, easing, callback) {
    
    var params = {
        skewy: skewy
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};

$.fn.skew = function(skewx, skewy, duration, delay, easing, callback) {
    
    var params = {
        skew: [skewx, skewy]
    };
    
    this.smoosy(params, duration, delay, easing, callback);
};