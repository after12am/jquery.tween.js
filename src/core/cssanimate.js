$.fn.cssanimate = function(params, duration, delay, ease, callback) {
    
    var duration, delay, ease, property, style;
    
    params = params || {};
    
    if (typeof duration === 'function') {
        callback = duration;
        duration = undefined;
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
    
    ['property', 'duration', 'delay', 'ease', 'style', 'origin'].forEach(function(name) {
        delete params[name];
    });
    
    // keep 3d control parameter disable.
    // this.parent().css('-webkit-perspective', params.perspective || 'none');
    delete params.perspective;
    
    // compile and then add to $.fn.queue() to animate serially
    new Style($(this), duration, delay, ease, style, property).compile(params).queue(callback);
    
    return this;
};