var Style = function(elem, duration, delay, ease, style, property) {
    this.css = {};
    this.elem = elem;
    this.transition = {
        transform: [],
        duration: typeof duration === 'number' ? duration : 400, // Specifies the amount of time it takes to change.
        delay: delay || 0, // Specifies whether the change begins when.
        ease: Style.ease[ease] || ease || 'ease-in-out', // Specifies the timing of the change.
        style: style || 'flat', // flat || preserve-3d
        property: property || 'all' // Specifies the name of the css properties that apply the transition effect.
    }
};

// declaration as const for the purpose of cache.
Style.prefix = browser.prefix();
Style.transitionEvent = browser.event.transitionEnd();

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
    for (var name in params) {
        switch (name) {
            case 'to': this.transition.transform.push(this.parseTranslate(params[name])); break;
            case 'x': this.transition.transform.push(this.parseX(params[name])); break;
            case 'y': this.transition.transform.push(this.parseY(params[name])); break;
            case 'z': this.transition.transform.push(this.parseZ(params[name])); break;
            case 'rotate': this.transition.transform.push(this.parseRotate(params[name])); break;
            case 'rotatex': this.transition.transform.push(this.parseRotateX(params[name])); break;
            case 'rotatey': this.transition.transform.push(this.parseRotateY(params[name])); break;
            case 'rotatez': this.transition.transform.push(this.parseRotateZ(params[name])); break;
            case 'scale': this.transition.transform.push(this.parseScale(params[name])); break;
            case 'scalex': this.transition.transform.push(this.parseScaleX(params[name])); break;
            case 'scaley': this.transition.transform.push(this.parseScaleY(params[name])); break;
            case 'scalez': this.transition.transform.push(this.parseScaleZ(params[name])); break;
            case 'skew': this.transition.transform.push(this.parseSkew(params[name])); break;
            case 'skewx': this.transition.transform.push(this.parseSkewX(params[name])); break;
            case 'skewy': this.transition.transform.push(this.parseSkewY(params[name])); break;
            default: continue;
        }
        delete params[name];
    }
    this.css = $.extend(property = params, this.build());
    return this;
}

// private
Style.prototype.build = function() {
    var transition = {};
    // If separate transform with space, we can use multiple transformation
    transition[browser.css.property('transform')] = this.transition.transform.join(' ');
    transition[browser.css.property('property')] = this.transition.property;
    transition[browser.css.property('duration')] = str('{0}ms').format(this.transition.duration);
    transition[browser.css.property('delay')] = str('{0}ms').format(this.transition.delay);
    transition[browser.css.property('ease')] = this.transition.ease;
    transition[browser.css.property('style')] = this.transition.style;
    console.log(browser.css.property('delay'))
    return transition;
}

Style.prototype.queue = function(callback) {
    var that = this;
    // add to $.fn.queue()
    $(this.elem).queue(function() {
        // callback that would execute after transition
        var animated = function() {
            $(this).unbind(Style.transitionEvent, $.proxy(animated, this));
            if (typeof callback === 'function') $.proxy(callback, this)();
            $(this).dequeue();
        }
        var i = 0;
        while (1) {
            if ($(that.elem).css(browser.css.property('duration'))) break;
            if (++i > 50) break; // avoid infinite loop
        }
        // When transition-duration propery is zero, we have to call callback function 
        // because transitionEvent would not be fired.
        if (that.transition.duration === 0) {
            $(that.elem).css(that.css);
            // We have to wait until css property is set.
            // If not so, next queue might be executed before setting css to dom.
            var i = 0;
            while (1) {
                if ($(that.elem).css(browser.css.property('duration')).match(/^0/)) break;
                if (++i > 50) break; // avoid infinite loop
            }
            if (typeof callback === 'function') $.proxy(callback, that.elem)();
            $(that.elem).dequeue();
            return;
        }
        $(that.elem).bind(Style.transitionEvent, $.proxy(animated, that.elem)).css(that.css);
    });
}

Style.prototype.parseTranslate = function(to) {
    if (to.constructor === Object) return this.parseTranslateObjectInitialiser(to);
    if (to.constructor === Array) return this.parseTranslateArrayInitialiser(to);
    return str('translate({0}px, {1}px)').format(
        to,
        to
    );
}

Style.prototype.parseTranslateObjectInitialiser = function(to) {
    return [
        this.parseX(to['x']),
        this.parseY(to['y']),
        this.parseZ(to['z'])
    ].join(' ');
}

Style.prototype.parseTranslateArrayInitialiser = function(to) {
    if (to.length === 2 || to.length === 3) {
        return [
            this.parseX(to[0]),
            this.parseY(to[1]),
            this.parseZ(to[2])
        ].join(' ');
    }
    if (to.length === 4) {
        return str('translate3d({0},{1},{2},{3}deg)').format(
            to[0] || 0, 
            to[1] || 0, 
            to[2] || 0, 
            to[3] || 0
        );
    }
}

Style.prototype.parseX = function(x) {
    return str('translateX({0}px)').format(
        x || 0
    );
}

Style.prototype.parseY = function(y) {
    return str('translateY({0}px)').format(
        y || 0
    );
}

Style.prototype.parseZ = function(z) {
    return str('translateZ({0}px)').format(
        z || 0
    );
}

Style.prototype.parseRotate = function(rotate) {
    if (rotate.constructor === Object) return this.parseRotateObjectInitialiser(rotate);
    if (rotate.constructor === Array) return this.parseRotateArrayInitialiser(rotate);
    return str('rotate({0}deg)').format(
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
    if (rotate.length === 2 || rotate.length === 3) {
        return [
            this.parseRotateX(rotate[0]),
            this.parseRotateY(rotate[1]),
            this.parseRotateZ(rotate[2])
        ].join(' ');
    }
    if (rotate.length === 4) {
        return str('rotate3d({0},{1},{2},{3}deg)').format(
            rotate[0] || 0, 
            rotate[1] || 0, 
            rotate[2] || 0, 
            rotate[3] || 0
        );
    }
}

Style.prototype.parseRotateX = function(rotatex) {
    return str('rotateX({0}deg)').format(
        rotatex || 0
    );
}

Style.prototype.parseRotateY = function(rotatey) {
    return str('rotateY({0}deg)').format(
        rotatey || 0
    );
}

Style.prototype.parseRotateZ = function(rotatez) {
    return str('rotateZ({0}deg)').format(
        rotatez || 0
    );
}

Style.prototype.parseScale = function(scale) {
    if (scale.constructor === Object) return this.parseScaleObjectInitialiser(scale);
    if (scale.constructor === Array) return this.parseScaleArrayInitialiser(scale);
    return str('scale({0},{1})').format(
        scale || 0,
        scale || 0
    );
}

Style.prototype.parseScaleObjectInitialiser = function(scale) {
    return str('scale3d({0},{1},{2})').format(
        scale['x'] || 0,
        scale['y'] || 0,
        scale['z'] || 0
    );
}

Style.prototype.parseScaleArrayInitialiser = function(scale) {
    if (scale.length === 2) {
        return [
            this.parseScaleX(scale[0]),
            this.parseScaleY(scale[1])
        ].join(' ');
    }
    return str('scale3d({0},{1},{2})').format(
        scale[0] || 0,
        scale[1] || 0,
        scale[2] || 0
    );
}

Style.prototype.parseScaleX = function(scalex) {
    return str('scaleX({0})').format(
        scalex || 0
    );
}

Style.prototype.parseScaleY = function(scaley) {
    return str('scaleY({0})').format(
        scaley || 0
    );
}

Style.prototype.parseScaleZ = function(scalez) {
    return str('scaleZ({0})').format(
        scalez || 0
    );
}

Style.prototype.parseSkew = function(skew) {
    if (skew.constructor === Object) return this.parseSkewObjectInitialiser(skew);
    if (skew.constructor === Array) return this.parseSkewArrayInitialiser(skew);
    // alternate of `skew({x}deg,{y}deg)` that is something wrong
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
    return str('skewX({0}deg)').format(
        skewx || 0
    );
}

Style.prototype.parseSkewY = function(skewy) {
    return str('skewY({0}deg)').format(
        skewy || 0
    );
}