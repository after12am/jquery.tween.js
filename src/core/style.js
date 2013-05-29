var Style = function() {
    this.css = {};
    this.transition = {};
};

// declaration as const for the purpose of cache.
Style.prefix = browser.prefix();
Style.transitionEvent = browser.transitionEnd();

// ease have been written by [visionmedia](https://github.com/visionmedia/move.js/blob/master/move.js)
Style.ease = {
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
}

Style.prototype.compile = function(params) {
    var transform = [];
    for (var name in params) {
        switch (name) {
        case 'x': transform.push(this.parseX(params[name])); break;
        case 'y': transform.push(this.parseY(params[name])); break;
        case 'z': transform.push(this.parseZ(params[name])); break;
        case 'rotate': transform.push(this.parseRotate(params[name])); break;
        case 'rotatex': transform.push(this.parseRotateX(params[name])); break;
        case 'rotatey': transform.push(this.parseRotateY(params[name])); break;
        case 'rotatez': transform.push(this.parseRotateZ(params[name])); break;
        case 'scale': transform.push(this.parseScale(params[name])); break;
        case 'scalex': transform.push(this.parseScaleX(params[name])); break;
        case 'scaley': transform.push(this.parseScaleY(params[name])); break;
        case 'scalez': transform.push(this.parseScaleZ(params[name])); break;
        case 'skew': transform.push(this.parseSkew(params[name])); break;
        case 'skewx': transform.push(this.parseSkewX(params[name])); break;
        case 'skewy': transform.push(this.parseSkewY(params[name])); break;
        default: continue;
        }
        delete params[name];
    }
    return this.build(params, transform);
}

Style.prototype.build = function(css, transform) {
    var transition = {};
    var prefix = Style.prefix;
    // If separate transform with space, we can use multiple transform.
    transition['{0}transform'.format(prefix)] = transform.join(' ');
    transition['{0}transition-property'.format(prefix)] = this.property(css);
    transition['{0}transition-duration'.format(prefix)] = this.duration(css);
    transition['{0}transition-delay'.format(prefix)] = this.delay(css);
    transition['{0}transition-timing-function'.format(prefix)] = this.ease(css);
    transition['{0}transform-style'.format(prefix)] = this.style(css);
    ['property', 'duration', 'delay', 'ease', 'style'].forEach(function(prop) {
        delete css[prop];
    });
    // combine css and transition
    this.css = $.extend(transition, css);
    this.transition = transition;
    return this;
}

Style.prototype.queue = function(elem, callback) {
    var that = this;
    var duration = this.duration();
    var prefix = Style.prefix;
    var animated = function() {
        $(elem).unbind(Style.transitionEvent, $.proxy(animated, elem));
        if (typeof callback === 'function') $.proxy(callback, elem)();
        $(elem).dequeue();
    };
    return function() {
        // When transition-duration propery is zero, we have to call callback function 
        // because transitionEvent would not be fired.
        if (duration === 0) {
            $(elem).css(css);
            // We have to wait until css property is set.
            // If not so, next queue might be executed before setting css to dom.
            var i = 0;
            while (1) {
                if ($(elem).css('{0}transition-duration'.format(prefix)).match(/^0/)) break;
                if (++i > 50) break; // avoid infinite loop
            }
            if (typeof callback === 'function') $.proxy(callback, elem)();
            $(elem).dequeue();
            return;
        }
        
        $(elem).bind(Style.transitionEvent, $.proxy(animated, elem)).css(that.css);
    }
}

Style.prototype.parseX = function(x) {
    return 'translateX({0}px)'.format(
        x || 0
    );
}

Style.prototype.parseY = function(y) {
    return 'translateY({0}px)'.format(
        y || 0
    );
}

Style.prototype.parseZ = function(z) {
    return 'translateZ({0}px)'.format(
        z || 0
    );
}

Style.prototype.parseRotate = function(rotate) {
    
    if (rotate.constructor === Object) {
        return this.parseRotateObjectInitialiser(rotate);
    }
    
    if (rotate.constructor === Array) {
        return this.parseRotateArrayInitialiser(rotate);
    }
    
    return 'rotate({0}deg)'.format(
        rotate || 0
    );
}

Style.prototype.parseRotateObjectInitialiser = function(rotate) {
    return [
        this.parseRotateX(rotate['x']),
        this.parseRotateY(rotate['y']),
        this.parseRotateZ(rotate['z'])
    ].join(' ');
}

Style.prototype.parseRotateArrayInitialiser = function(rotate) {
    return 'rotate3d({0},{1},{2},{3}deg)'.format(
        rotate[0] || 0, 
        rotate[1] || 0, 
        rotate[2] || 0, 
        rotate[3] || 0
    );
}

Style.prototype.parseRotateX = function(rotatex) {
    return 'rotateX({0}deg)'.format(
        rotatex || 0
    );
}

Style.prototype.parseRotateY = function(rotatey) {
    return 'rotateY({0}deg)'.format(
        rotatey || 0
    );
}

Style.prototype.parseRotateZ = function(rotatez) {
    return 'rotateZ({0}deg)'.format(
        rotatez || 0
    );
}

Style.prototype.parseScale = function(scale) {
    
    if (scale.constructor === Object) {
        return this.parseScaleObjectInitialiser(scale);
    }
    
    if (scale.constructor === Array) {
        return this.parseScaleArrayInitialiser(scale);
    }
    
    return 'scale({0},{1})'.format(
        scale || 0,
        scale || 0
    );
}

Style.prototype.parseScaleObjectInitialiser = function(scale) {
    return 'scale3d({0},{1},{2})'.format(
        scale['x'] || 0,
        scale['y'] || 0,
        scale['z'] || 0
    );
}

Style.prototype.parseScaleArrayInitialiser = function(scale) {
    return 'scale3d({0},{1},{2})'.format(
        scale[0] || 0,
        scale[1] || 0,
        scale[2] || 0
    );
}

Style.prototype.parseScaleX = function(scalex) {
    return 'scaleX({0})'.format(
        scalex || 0
    );
}

Style.prototype.parseScaleY = function(scaley) {
    return 'scaleY({0})'.format(
        scaley || 0
    );
}

Style.prototype.parseScaleZ = function(scalez) {
    return 'scaleZ({0})'.format(
        scalez || 0
    );
}

Style.prototype.parseSkew = function(skew) {
    
    if (skew.constructor === Object) {
        return this.parseSkewObjectInitialiser(skew);
    }
    
    if (skew.constructor === Array) {
        return this.parseSkewArrayInitialiser(skew);
    }
    
    // alternate of `skew({x}deg,{y}deg)` which is something wrong
    return [
        this.parseSkewX(skew),
        this.parseSkewY(skew)
    ].join(' ');
}

Style.prototype.parseSkewObjectInitialiser = function(skew) {
    return [
        this.parseSkewX(skew['x']),
        this.parseSkewY(skew['y'])
    ].join(' ');
}

Style.prototype.parseSkewArrayInitialiser = function(skew) {
    return [
        this.parseSkewX(skew[0]),
        this.parseSkewY(skew[1])
    ].join(' ');
}

Style.prototype.parseSkewX = function(skewx) {
    return 'skewX({0}deg)'.format(
        skewx || 0
    );
}

Style.prototype.parseSkewY = function(skewy) {
    return 'skewY({0}deg)'.format(
        skewy || 0
    );
}

/*
    Specifies the name of the CSS properties that apply the transition effect.
*/
Style.prototype.property = function(params) {
    var property = params['property'] || 'all';
    if (property.constructor === Array) {
        return property.join(',');
    }
    return property;
}

/*
    Specifies the amount of time it takes to change.
*/
Style.prototype.duration = function(params) {
    if (!params) {
        var prefix = Style.prefix;
        var k = '{0}transition-duration'.format(prefix);
        return this.transition[k].replace('ms', '');
    }
    return '{0}ms'.format(
        params['duration'] || 400
    );
}

/*
    Specifies whether the change begins when.
*/
Style.prototype.delay = function(params) {
    return params['delay'] || 0;
}

/*
    Specifies the timing of the change.
*/
Style.prototype.ease = function(params) {
    return params['ease'] ? Style.ease[params['ease']] : 'ease-in-out';
}

/*
    flat || preserve-3d
*/
Style.prototype.style = function(params) {
    return [
        'flat',
        'preserve-3d'
    ].indexOf(params['style']) >= 0 ? params['style'] : 'flat';
}