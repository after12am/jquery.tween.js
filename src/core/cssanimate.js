$.fn.cssanimate = function(params, duration, delay, ease, callback) {
    
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
    
    if (duration) params.duration = duration;
    if (delay) params.delay = delay;
    if (ease) params.ease = ease;
    
    // keep 3d control parameter disable.
    // this.parent().css('-webkit-perspective', params.perspective || 'none');
    delete params.perspective;
    
    // add to $.fn.queue()
    $(this).queue(new Style().compile(params).queue($(this), callback));
    
    return this;
};