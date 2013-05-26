$.fn.cssanimate = function(params, duration, delay, easing, callback) {
    
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
    
    // keep 3d control parameter disable.
    // this.parent().css('-webkit-perspective', params.perspective || 'none');
    delete params.perspective;
    
    this.queue(function() {
        
        function animated() {
            $(this).unbind(Style.onTransitionEvent, $.proxy(animated, this));
            if (typeof callback === 'function') $.proxy(callback, this)();
            $(this).dequeue();
        }
        
        var style = new Style(duration, delay, easing, origin, style);
        var css = style.assemble(params).css;
        
        // When transition-duration propery is zero, we have to call callback function 
        // because onTransitionEvent would not be fired.
        if (style.transition.duration === 0) {
            $(this).css(css);
            // We have to wait until css property is set.
            // If not so, next queue might be executed before setting css to dom.
            var i = 0;
            while (1) {
                var adopted = $(this).css('{0}transition-delay'.format(Style.prefix));
                if (adopted === '0s') break;
                if (++i > 50) break; // avoid infinite loop
            }
            $.proxy(callback, this)();
            $(this).dequeue();
            return;
        }
        
        $(this).bind(Style.onTransitionEvent, $.proxy(animated, this)).css(css);
    })
    
    return this;
};