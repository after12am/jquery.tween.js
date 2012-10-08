
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
}

$.fn.transit = function(params, duration, delay, easing, callback) {
    
    if (typeof duration === 'function') {
        callback = duration;
        duration = undefined;;
    }
    
    if (typeof delay === 'function') {
        callback = delay;
        delay = undefined;
    }
    
    if (typeof easing === 'function') {
        callback = easing;
        easing = undefined;
    }
    
    callback = callback || function() {};
    
    if (params.perspective) {
        this.parent().css('-webkit-perspective', params.perspective);
        delete params.perspective;
    } else {
        this.parent().css('-webkit-perspective', 'none');
    }
    
    var style = new Style(params, duration, delay, easing);
    var onTransitionEvent = whichTransitionEvent();
    
    var onTransitionEnd = function(e) {
        
        this.unbind(onTransitionEvent);
        this.trigger('onTransitionEnd');
        
        ($.proxy(callback, this))(e);
    };
    
    this.bind(onTransitionEvent, $.proxy(onTransitionEnd, this))
        .css(style.build())
    
    return this;
};