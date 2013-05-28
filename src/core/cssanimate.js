var cssanimate = function() {
    
}

// ease have been written by [visionmedia](https://github.com/visionmedia/move.js/blob/master/move.js)
cssanimate.ease = {
    'in'                : 'ease-in',
    'out'               : 'ease-out',
    'in-out'            : 'ease-in-out',
    'snap'              : 'cubic-bezier(0,1,.5,1)',
    'linear'            : 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
    'ease-in-quad'      : 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
    'ease-in-cubic'     : 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
    'ease-in-quart'     : 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
    'ease-in-quint'     : 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
    'ease-in-sine'      : 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
    'ease-in-expo'      : 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
    'ease-in-circ'      : 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
    'ease-in-back'      : 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
    'ease-out-quad'     : 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    'ease-out-cubic'    : 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
    'ease-out-quart'    : 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
    'ease-out-quint'    : 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
    'ease-out-sine'     : 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
    'ease-out-expo'     : 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
    'ease-out-circ'     : 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
    'ease-out-back'     : 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
    'ease-out-quad'     : 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
    'ease-out-cubic'    : 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    'ease-in-out-quart' : 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
    'ease-in-out-quint' : 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
    'ease-in-out-sine'  : 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
    'ease-in-out-expo'  : 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
    'ease-in-out-circ'  : 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
    'ease-in-out-back'  : 'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
};

$.fn.cssanimate = function(params, duration, delay, ease, callback) {
    
    var params = params || {};
    var style = undefined;
    
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
    
    if (params.duration) {
        duration = params.duration;
        delete params.duration;
    }
    
    if (params.delay) {
        delay = params.delay;
        delete params.delay;
    }
    
    if (params.ease) {
        ease = params.ease;
        delete params.ease;
    }
    
    if (params.style) {
        style = params.style;
        delete params.style;
    }
    
    // keep 3d control parameter disable.
    // this.parent().css('-webkit-perspective', params.perspective || 'none');
    delete params.perspective;
    
    this.queue(function() {
        
        var style = new Style(duration, delay, ease, style);
        var css = style.assemble(params).css;
        var animated = function() {
            $(this).unbind(Style.onTransitionEvent, $.proxy(animated, this));
            if (typeof callback === 'function') $.proxy(callback, this)();
            $(this).dequeue();
        }
        
        // When transition-duration propery is zero, we have to call callback function 
        // because onTransitionEvent would not be fired.
        if (style.transition.duration === 0) {
            $(this).css(css);
            // We have to wait until css property is set.
            // If not so, next queue might be executed before setting css to dom.
            var i = 0, prefix = Style.prefix;
            while (1) {
                var adopted = $(this).css('{0}transition-duration'.format(prefix));
                if (adopted === '0s') break;
                if (++i > 50) break; // avoid infinite loop
            }
            if (typeof callback === 'function') $.proxy(callback, this)();
            $(this).dequeue();
            return;
        }
        
        $(this).bind(Style.onTransitionEvent, $.proxy(animated, this)).css(css);
    })
    
    return this;
};