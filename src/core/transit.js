
function whichTransitionEvent() {
    
    var e = $('<div>')[0];
    
    var transitions = {
      'transition': 'transitionEnd',
      'OTransition': 'oTransitionEnd',
      'MSTransition': 'msTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    }

    for (var t in transitions) {
        if(e.style[t] !== undefined) {
            return transitions[t];
        }
    }
};

$.fn.transit = function(params, duration, delay, easing, callback) {
    
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
    
    if (params.perspective) {
        this.parent().css('-webkit-perspective', params.perspective);
        delete params.perspective;
    } else {
        this.parent().css('-webkit-perspective', 'none');
    }
    
    var css = new Style(params, duration, delay, easing, origin, style);
    var onTransitionEvent = whichTransitionEvent();
    var end = function(e) {
        
        this.unbind(onTransitionEvent);
        this.trigger('onTransitionEnd');
        
        if (typeof callback === 'function') {
            ($.proxy(callback, this))(e);
        }
    };
    
    this.bind(event, $.proxy(onTransitionEvent, this))
        .css(css.build())
    
    return this;
};