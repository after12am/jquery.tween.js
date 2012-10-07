
var Transition = function() {
    
    this.naturalEvent = this.whichTransitionEvent();
};

Transition.prototype.whichTransitionEvent = function() {
    
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionEnd',
      'OTransition':'oTransitionEnd',
      'MSTransition':'msTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if(el.style[t] !== undefined){
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
    
    if (params.perspective) {
        this.parent().css('-webkit-perspective', params.perspective);
        delete params.perspective;
    } else {
        this.parent().css('-webkit-perspective', 'none');
    }
    
    var transition = new Transition();
    var css = new CSS3(params, duration, delay, easing);
    
    var onTransitionEnd = function(e) {
        
        this.unbind(transition.naturalEvent);
        this.trigger('onTransitionEnd');
        
        ($.proxy(callback, this))(e);
    };
    
    this.bind(transition.naturalEvent, $.proxy(onTransitionEnd, this))
        .css(css.build())
    
    return this;
};