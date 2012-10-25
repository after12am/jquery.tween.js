
$.fn.smoosy = function(params, duration, delay, easing, callback) {
    
    var origin = undefined;
    var style = undefined;
    
    if (typeof duration === 'function') {
        callback = duration;
        duration = undefined;
    }
    
    if (typeof delay === 'function') {
        callback = delay;
        delay = undefined;
    }
    
    if (typeof easing === 'function') {
        callback = easing;
        easing = undefined;
    }
    
    if (params.duration) {
        duration = params.duration;
        delete params.duration;
    }
    
    if (params.delay) {
        delay = params.delay;
        delete params.delay;
    }
    
    if (params.easing) {
        easing = params.easing;
        delete params.easing;
    }
    
    if (params.origin) {
        origin = params.origin;
        delete params.origin;
    }
    
    if (params.style) {
        origin = params.style;
        delete params.style;
    }
    
    this.parent().css('-webkit-perspective', params.perspective || 'none');
    delete params.perspective;
    
    new Style(this, params, duration, delay, easing, origin, style, callback).adopt();
    
    return this;
};