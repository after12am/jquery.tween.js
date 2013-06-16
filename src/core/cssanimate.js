$.fn.cssanimate = function(params, duration, delay, ease, callback) {
    
    // If params property is not specified, the argument is initialized.
    params = params || {};
    
    var property, style;
    
    if (params.constructor === Array) {
        this.cssanimate.loopback(this, params);
        return this;
    }
    
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
    
    ['property', 'duration', 'delay', 'ease', 'style', 'origin', 'perspective'].forEach(function(name) {
        delete params[name];
    });
    
    for (var name in params) {
        if (name.match(/transform$/)) delete params[name];
        else if (name.match(/transform-origin$/)) delete params[name];
        else if (name.match(/transition-duration$/)) delete params[name];
        else if (name.match(/transition-property$/)) delete params[name];
        else if (name.match(/transition-delete$/)) delete params[name];
        else if (name.match(/transition-timing-function$/)) delete params[name];
        else if (name.match(/transition-style$/)) delete params[name];
    }
    
    // cache current property setting
    this.cache = this.cache || new Style($(this));
    // add to $.fn.queue() to animate serially after building appropriate css properties
    this.cache.compile(params, duration, delay, ease, style, property, callback);
    
    return this;
};

// When you want to stop the loop, call $.fn.stop(true, true).
$.fn.cssanimate.loopback = function(elem, cssanimates) {
    
    var _ = [];
    
    cssanimates.forEach(function(args, i) {
        _[i] = $.extend(true, {}, args);
    });
    
    _.forEach(function(args, i) {
        $(elem).cssanimate(args[0], args[1], args[2], args[3], args[4]);
    });
    
    $(elem).queue(function() {
        $(elem).cssanimate(cssanimates);
        $(elem).dequeue();
    });
    
    return elem;
};