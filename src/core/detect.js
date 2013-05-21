var transitionEvent = function() {
    var e = $('<div>')[0];
    var onTransitionEvent = 'transitionEnd';
    var transitions = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'MSTransition': 'msTransitionEnd',
        'OTransition': 'oTransitionEnd',
        'transition': 'transitionEnd'
    };
    for (var t in transitions) {
        if(e.style[t] !== undefined) {
            onTransitionEvent = transitions[t];
            break;
        }
    }
    return onTransitionEvent;
}

var prefix = function() {
    var e = $('<div>')[0];
    var prefix = '';
    var prefixes = {
        'WebkitTransition': '-webkit-',
        'MozTransition': '-moz-',
        'MSTransition': '-ms-',
        'OTransition': '-o-',
        'transition': ''
    };
    for (var t in prefixes) {
        if(e.style[t] !== undefined) {
            prefix = prefixes[t];
            break;
        }
    }
    return prefix;
}