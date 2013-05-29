var browser = {
    
}

browser.prefix = function() {
    var e = $('<div>')[0];
    var prefix = '';
    var prefixes = {
        'WebkitTransition': '-webkit-',
        'MozTransition': '-moz-',
        'MSTransition': '-ms-',
        'OTransition': '-o-',
        'transition': ''
    };
    for (var prefix in prefixes) {
        if(e.style[prefix] !== undefined) {
            prefix = prefixes[prefix];
            break;
        }
    }
    return prefix;
}

browser.transitionEnd = function() {
    var e = $('<div>')[0];
    var name = 'transitionEnd';
    var transitions = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'MSTransition': 'msTransitionEnd',
        'OTransition': 'oTransitionEnd',
        'transition': 'transitionEnd'
    };
    for (var transition in transitions) {
        if(e.style[transition] !== undefined) {
            name = transitions[transition];
            break;
        }
    }
    return name;
}