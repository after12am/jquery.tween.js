$.fn.cssanimate = function(params, duration, delay, ease, callback) {
    
    var params = params || {};
    var duration = 400;
    
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
        delete duration;
    }
    if (delay) params.delay = delay;
    if (ease) params.ease = ease;
    
    delete params['origin'];
    
    // keep 3d control parameter disable.
    // this.parent().css('-webkit-perspective', params.perspective || 'none');
    delete params.perspective;
    
    // add to $.fn.queue()
    $(this).queue(new Style(duration).compile(params).queue($(this), callback));
    
    return this;
};