var Style = function(elem, duration, delay, easing, origin, style, callback) {
    this.elem = elem;
    this.callback = callback;
    this.css = {};
    this.transform = [];
    this.transition = {
        properties: ['all'], // Specifies the name of the CSS properties that apply the transition effect.
        duration: duration || 1, // Specifies the amount of time it takes to change. Set 1 as default because no event fired when set 0.
        delay: delay || 0, // Specifies whether the change begins when.
        easing: easing || 'ease-in-out', // Specifies the timing of the change.
        origin: origin || '50% 50%', // Specify the origin.
        style: style || 'flat' // or preserve-3d
    };
};

Style.prototype.parse = function(params) {
    
    if (params.x != undefined && params.y != undefined && params.z != undefined) {
        this.transform.push('translate3d({0}px,{1}px,{2}px)'.format(
            params.x, 
            params.y, 
            params.z
        ));
        delete params.x;
        delete params.y;
        delete params.z;
    }
    
    if (params.x != undefined && params.y != undefined) {
        this.transform.push('translate({0}px,{1}px)'.format(
            params.x, 
            params.y
        ));
        delete params.x;
        delete params.y;
    }
    
    if (params.x != undefined) {
        this.transform.push('translateX({0}px)'.format(
            params.x
        ));
        delete params.x;
    }
    
    if (params.y != undefined) {
        this.transform.push('translateY({0}px)'.format(
            params.y
        ));
        delete params.y;
    }
    
    if (params.z != undefined) {
        this.transform.push('translateZ({0}px)'.format(
            params.z
        ));
        delete params.z;
    }
    
    // rotate
    if (typeof params.rotate == 'object') {
        
        if (params.rotate['x'] != undefined) {
            this.transform.push('rotate3d({0},{1},{2},{3}deg)'.format(
                params.rotate['x'], 
                params.rotate['y'], 
                params.rotate['z'], 
                params.rotate['rotate']
            ));
        }
        
        if (params.rotate[0] != undefined) {
            this.transform.push('rotate3d({0},{1},{2},{3}deg)'.format(
                params.rotate[0], 
                params.rotate[1], 
                params.rotate[2], 
                params.rotate[3]
            ));
        }
        
        delete params.rotate;
        delete params.rotatex;
        delete params.rotatey;
        delete params.rotatez;
    }
    
    if (params.rotate != undefined) {
        this.transform.push('rotate({0}deg)'.format(
            params.rotate
        ));
        delete params.rotate;
    }
    
    if (params.rotatex != undefined) {
        this.transform.push('rotateX({0}deg)'.format(
            params.rotatex
        ));
        delete params.rotatex;
    }
    
    if (params.rotatey != undefined) {
        this.transform.push('rotateY({0}deg)'.format(
            params.rotatey
        ));
        delete params.rotatey;
    }
    
    if (params.rotatez != undefined) {
        this.transform.push('rotateZ({0}deg)'.format(
            params.rotatez
        ));
        delete params.rotatez;
    }
    
    // scale
    if (typeof params.scale == 'object') {

        if (params.scale['x'] != undefined) {
            this.transform.push('scale3d({0},{1},{2})'.format(
                params.scale['x'],
                params.scale['y'],
                params.scale['z']
            ));
        }
        
        if (params.scale[0] != undefined) {
            this.transform.push('scale3d({0},{1},{2})'.format(
                params.scale[0],
                params.scale[1],
                params.scale[2]
            ));
        }

        delete params.scale;
        delete params.scalex;
        delete params.scaley;
        delete params.scalez;
    }
    
    if (params.scale != undefined) {
        this.transform.push('scale({0},{1})'.format(
            params.scale,
            params.scale
        ));
        delete params.scale;
    }

    if (params.scalex != undefined) {
        this.transform.push('scaleX({0})'.format(
            params.scalex
        ));
        delete params.scalex;
    }

    if (params.scaley != undefined) {
        this.transform.push('scaleY({0})'.format(
            params.scaley
        ));
        delete params.scaley;
    }

    if (params.scalez != undefined) {
        this.transform.push('scaleZ({0})'.format(
            params.scalez
        ));
        delete params.scalez;
    }
    
    // skew
    if (typeof params.skew == 'object') {
        
        if (params.skew['x'] != undefined) {
            this.transform.push('skew({0}deg,{1}deg)'.format(
                params.skew['x'],
                params.skew['y']
            ));
        }

        if (params.skew[0] != undefined) {
            this.transform.push('skew({0}deg,{1}deg)'.format(
                params.skew[0],
                params.skew[1]
            ));
        }
        
        delete params.skew;
        delete params.skewx;
        delete params.skewy;
    }
    
    if (params.skewx != undefined) {
        this.transform.push('skewX({0}deg)'.format(
            params.skewx
        ));
        delete params.skewx;
    }
    
    if (params.skewy != undefined) {
        this.transform.push('skewY({0}deg)'.format(
            params.skewy
        ));
        delete params.skewy;
    }
    
    if (typeof params.property == 'object') {
        this.transition.properties = params.property;
        delete params.property;
    }
    
    if (typeof params.property == 'string') {
        this.transition.properties.push(params.property);
        delete params.property;
    }
    
    this.css = params;
    return this;
};

Style.prototype.adopt = function() {
    
    var e = $('<div>')[0];
    var prefix;
    var onTransitionEvent;
    
    var transitions = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'MSTransition': 'msTransitionEnd',
        'OTransition': 'oTransitionEnd',
        'transition': 'transitionEnd'
    };
    
    var prefixes = {
        'WebkitTransition': '-webkit-',
        'MozTransition': '-moz-',
        'MSTransition': '-ms-',
        'OTransition': '-o-',
        'transition': ''
    };
    
    for (var t in transitions) {
        if(e.style[t] !== undefined) {
            prefix = prefixes[t];
            onTransitionEvent = transitions[t];
            break;
        }
    }
    
    var properties = {};
    properties['{0}transition-property'.format(prefix)] = this.transition.properties.join(',');
    properties['{0}transition-duration'.format(prefix)] = this.transition.duration + 'ms';
    properties['{0}transition-timing-function'.format(prefix)] = this.transition.easing;
    properties['{0}transition-delay'.format(prefix)] = this.transition.delay + 'ms';
    properties['{0}transform'.format(prefix)] = this.transform.join(' '); // If you separate transform function, you can apply multiple transform effects.
    properties['{0}transform-origin'.format(prefix)] = this.transition.origin;
    properties['{0}transform-style'.format(prefix)] = this.transition.style;
    
    this.elem.bind(onTransitionEvent, $.proxy(this.proxy(onTransitionEvent), this.elem)).css($.extend(properties, this.css));
};

Style.prototype.proxy = function(onTransitionEvent) {
    var that = this;
    return function(e) {
        this.unbind(onTransitionEvent);
        this.trigger('onTransitionEnd');
        if (typeof that.callback !== 'function') return;
        ($.proxy(that.callback, this))(e);
    };
};