var browser = {};

// return vendor prefix
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
            return prefixes[prefix];
        }
    }
    return prefix;
}

browser.event = {};
// return event name with vendor prefix
browser.event.transitionEnd = function() {
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
            return transitions[transition];
        }
    }
    return name;
}

browser.css = {};
// return property name with vendor prefix
browser.css.property = function(name) {
    var prefix = Style.prefix;
    var with_prefix = {
        'transform': '{0}transform'.format(prefix),
        'origin': '{0}transform-origin'.format(prefix),
        'duration': '{0}transition-duration'.format(prefix),
        'property': '{0}transition-property'.format(prefix),
        'delay': '{0}transition-delay'.format(prefix),
        'ease': '{0}transition-timing-function'.format(prefix),
        'style': '{0}transition-style'.format(prefix),
        'perspective': '{0}perspective'.format(prefix)
    }
    return with_prefix[name] || name;
}