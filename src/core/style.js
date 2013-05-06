
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

var prefixes = [
    '-webkit-',
    '-moz-',
    '-ms-',
    '-o-',
    ''
];

var Style = function(elem, params, duration, delay, easing, origin, style, callback) {
    
    this.elem = elem;
    this.callback = callback;
    this.css = {};
    this.transform = [];
    this.transition = {
        properties: [], // Specifies the name of the CSS properties that apply the transition effect.
        duration: duration || 0, // Specifies the amount of time it takes to change.
        delay: delay || 0, // Specifies whether the change begins when.
        easing: easing || 'ease-in-out', // Specifies the timing of the change.
        origin: origin || '50% 50%', // Specify the origin.
        style: style || 'flat' // or preserve-3d
    };
    
    this.parse(params).adopt();
};

Style.prototype.adopt = function() {
    
    if (this.transition.properties.length == 0) {
        this.transition.properties = ['all'];
    }
    
    var that = this;
    var onTransitionEvent = whichTransitionEvent();
    var properties = {};
    
    prefixes.forEach(function(prefix) {
        var transitionProperty = '{prefix}transition-property'.format({prefix: prefix});
        var transitionDuration = '{prefix}transition-duration'.format({prefix: prefix});
        var transitionTimingFunction = '{prefix}transition-timing-function'.format({prefix: prefix});
        var transitionDelay = '{prefix}transition-delay'.format({prefix: prefix});
        var transform = '{prefix}transform'.format({prefix: prefix});
        var transformOrigin = '{prefix}transform-origin'.format({prefix: prefix});
        var transformStyle = '{prefix}transform-style'.format({prefix: prefix});
        
        properties[transitionProperty] = that.transition.properties.join(',');
        properties[transitionDuration] = that.transition.duration + 'ms';
        properties[transitionTimingFunction] = that.transition.easing;
        properties[transitionDelay] = that.transition.delay + 'ms';
        properties[transform] = that.transform.join(' '); // If you separate transform function, you can apply multiple transform effects.
        properties[transformOrigin] = that.transition.origin;
        properties[transformStyle] = that.transition.style;
    });
    
    
    var callback = function(e) {
        this.unbind(onTransitionEvent);
        this.trigger('onTransitionEnd');
        if (typeof that.callback === 'function') {
            ($.proxy(that.callback, this))(e);
        }
    };
    
    this.elem
        .bind(onTransitionEvent, $.proxy(callback, this.elem))
        .css($.extend(properties, this.css));
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