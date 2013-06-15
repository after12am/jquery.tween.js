var browser = {};
var e = $('<div>')[0];

// return vendor prefix
browser.prefix = function() {
    var prefix = '';
    var prefixes = {
        'WebkitTransition': '-webkit-',
        'MozTransition': '-moz-',
        'MSTransition': '-ms-',
        'OTransition': '-o-'
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
    var name = 'transitionEnd';
    var transitions = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'mozTransitionend',
        'MSTransition': 'msTransitionEnd',
        'OTransition': 'oTransitionEnd'
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
    var translate = {
        'transform': str('{0}transform').format(prefix),
        'origin': str('{0}transform-origin').format(prefix),
        'duration': str('{0}transition-duration').format(prefix),
        'property': str('{0}transition-property').format(prefix),
        'delay': str('{0}transition-delay').format(prefix),
        'ease': str('{0}transition-timing-function').format(prefix),
        'style': str('{0}transition-style').format(prefix),
        'perspective': str('{0}perspective').format(prefix)
    };
    var with_prefix = str('{0}{1}').format(
        browser.prefix,
        name
    );
    if (translate[name]) return translate[name];
    // free from vendor prefix
    if (e.style[with_prefix] !== undefined) return with_prefix;
    return name;
}