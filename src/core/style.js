var Style = function(elem) {
    this.elem = elem;
    this.transition = {};
    this.position = { x: 0, y: 0, z: 0 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.skew = { x: 0, y: 0 };
    this.filter = {};
};

// declaration as const for the purpose of cache.
Style.prefix = browser.prefix();
Style.transitionEvent = browser.event.transitionEnd();
Style.ease = {
    // have been written by [visionmedia](https://github.com/visionmedia/move.js/blob/master/move.js)
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

Style.prototype.compile = function(params, duration, delay, ease, style, property, callback) {
    this.transition = {
        duration: typeof duration === 'number' ? duration : 400, // Specifies the amount of time it takes to change.
        delay: delay || 0, // Specifies whether the change begins when.
        ease: Style.ease[ease] || ease || 'ease-in-out', // Specifies the timing of the change.
        style: style || 'flat', // flat || preserve-3d
        property: property || 'all' // Specifies the name of the css properties that apply the transition effect.
    }
    // parse cssanimate properties and take over the values
    this.parse(params);
    // deep copy for avoiding to overwrite by the time lag
    var css = $.extend(true, {}, this.build(params));
    this.queue(css, callback);
    return this;
}

// private
Style.prototype.queue = function(css, callback) {
    var that = this;
    // add to $.fn.queue()
    $(this.elem).queue(function() {
        // callback that would execute after transition
        var animated = function() {
            $(this).unbind(Style.transitionEvent, $.proxy(animated, this));
            if (typeof callback === 'function') $.proxy(callback, this)();
            $(this).dequeue();
        }
        // could animate with this even just after element have been appended to dom
        var i = 0;
        while (1) {
            if ($(that.elem).css(browser.css.property('duration'))) break;
            if (++i > 50) break; // avoid infinite loop
        }
        // When transition-duration propery is zero, we have to call callback function 
        // because transitionEvent would not be fired.
        if (that.transition.duration === 0) {
            $(that.elem).css(css);
            // We have to wait until css property is set.
            // If not so, next queue might be executed before setting css to dom.
            var i = 0;
            while (1) {
                if ($(that.elem).css(browser.css.property('duration')).match(/^0/)) break;
                if (++i > 50) break; // avoid infinite loop
            }
            // alternate callback process of animate()
            if (typeof callback === 'function') $.proxy(callback, that.elem)();
            $(that.elem).dequeue();
            return;
        }
        // transition-duration propery is set with condition of (> 0)
        // transitionEnd event will completely fired.
        $(that.elem).bind(Style.transitionEvent, $.proxy(animated, that.elem)).css(css);
    });
}

// private
Style.prototype.parse = function(params) {
    // take over the values
    for (var name in params) {
        if (name == 'to') this.parseTranslate(params[name]);
        else if (name == 'x') this.parseTranslateX(params[name]);
        else if (name == 'y') this.parseTranslateY(params[name]);
        else if (name == 'z') this.parseTranslateZ(params[name]);
        else if (name == 'rotate') this.parseRotate(params[name]);
        else if (name == 'rotatex') this.parseRotateX(params[name]);
        else if (name == 'rotatey') this.parseRotateY(params[name]);
        else if (name == 'rotatez') this.parseRotateZ(params[name]);
        else if (name == 'scale') this.parseScale(params[name]);
        else if (name == 'scalex') this.parseScaleX(params[name]);
        else if (name == 'scaley') this.parseScaleY(params[name]);
        else if (name == 'scalez') this.parseScaleZ(params[name]);
        else if (name == 'skew') this.parseSkew(params[name]);
        else if (name == 'skewx') this.parseSkewX(params[name]);
        else if (name == 'skewy') this.parseSkewY(params[name]);
        else continue;
        delete params[name];
    }
    // hold the value in the same way as transformation
    if (params.filter) {
        for (var name in params.filter) {
            if (name == 'grayscale') this.filter['grayscale'] = this.buildGrayscale(params.filter[name]);
            else if (name == 'sepia') this.filter['sepia'] = this.buildSepia(params.filter[name]);
            else if (name == 'saturate') this.filter['saturate'] = this.buildSaturate(params.filter[name]);
            else if (name == 'hue-rotate') this.filter['hue-rotate'] = this.buildHueRotate(params.filter[name]);
            else if (name == 'invert') this.filter['invert'] = this.buildInvert(params.filter[name]);
            else if (name == 'opacity') this.filter['opacity'] = this.buildOpacity(params.filter[name]);
            else if (name == 'brightness') this.filter['brightness'] = this.buildBrightness(params.filter[name]);
            else if (name == 'contrast') this.filter['contrast'] = this.buildContrast(params.filter[name]);
            else if (name == 'blur') this.filter['blur'] = this.buildBlur(params.filter[name]);
            else if (name == 'drop-shadow') this.filter['drop-shadow'] = this.buildDropShadow(params.filter[name]);
            else if (name == 'shader') this.filter['shader'] = this.buildShader(params.filter[name]);
        }
        delete params.filter;
    }
}

Style.prototype.parseTranslate = function(to) {
    if (to.constructor === Array) this.parseTranslateArrayInitialiser(to);
    if (to.constructor === Object) this.parseTranslateObjectInitialiser(to);
    if (to.constructor === Number) this.position.x = to;
}

Style.prototype.parseTranslateX = function(x) {
    if (x !== undefined && x.constructor === Number) this.position.x = x;
}

Style.prototype.parseTranslateY = function(y) {
    if (y !== undefined && y.constructor === Number) this.position.y = y;
}

Style.prototype.parseTranslateZ = function(z) {
    if (z !== undefined && z.constructor === Number) this.position.z = z;
}

Style.prototype.parseTranslateObjectInitialiser = function(to) {
    if (to.x !== undefined && to.x.constructor === Number) this.position.x = to.x;
    if (to.y !== undefined && to.y.constructor === Number) this.position.y = to.y;
    if (to.z !== undefined && to.z.constructor === Number) this.position.z = to.z;
}

Style.prototype.parseTranslateArrayInitialiser = function(to) {
    if (to[0] !== undefined && to[0].constructor === Number) this.position.x = to[0];
    if (to[1] !== undefined && to[1].constructor === Number) this.position.y = to[1];
    if (to[2] !== undefined && to[2].constructor === Number) this.position.z = to[2];
}

Style.prototype.parseRotate = function(rotation) {
    if (rotation.constructor === Array) this.parseRotateArrayInitialiser(rotation);
    if (rotation.constructor === Object) this.parseRotateObjectInitialiser(rotation);
    if (rotation.constructor === Number) this.rotation.z = rotation;
}

Style.prototype.parseRotateX = function(x) {
    if (x !== undefined && x.constructor === Number) this.rotation.x = x;
}

Style.prototype.parseRotateY = function(y) {
    if (y !== undefined && y.constructor === Number) this.rotation.y = y;
}

Style.prototype.parseRotateZ = function(z) {
    if (z !== undefined && z.constructor === Number) this.rotation.z = z;
}

Style.prototype.parseRotateObjectInitialiser = function(rotation) {
    if (rotation.x !== undefined && rotation.x.constructor === Number) this.rotation.x = rotation.x;
    if (rotation.y !== undefined && rotation.y.constructor === Number) this.rotation.y = rotation.y;
    if (rotation.z !== undefined && rotation.z.constructor === Number) this.rotation.z = rotation.z;
}

Style.prototype.parseRotateArrayInitialiser = function(rotation) {
    if (rotation[0] !== undefined && rotation[0].constructor === Number) this.rotation.x = rotation[0];
    if (rotation[1] !== undefined && rotation[1].constructor === Number) this.rotation.y = rotation[1];
    if (rotation[2] !== undefined && rotation[2].constructor === Number) this.rotation.z = rotation[2];
}

Style.prototype.parseScale = function(scale) {
    if (scale.constructor === Array) this.parseScaleArrayInitialiser(scale);
    if (scale.constructor === Object) this.parseScaleObjectInitialiser(scale);
    if (scale.constructor === Number) this.scale.x = this.scale.y = scale;
}

Style.prototype.parseScaleX = function(x) {
    if (x !== undefined && x.constructor === Number) this.scale.x = x;
}

Style.prototype.parseScaleY = function(y) {
    if (y !== undefined && y.constructor === Number) this.scale.y = y;
}

Style.prototype.parseScaleZ = function(z) {
    if (z !== undefined && z.constructor === Number) this.scale.z = z;
}

Style.prototype.parseScaleObjectInitialiser = function(scale) {
    if (scale.x !== undefined && scale.x.constructor === Number) this.scale.x = scale.x;
    if (scale.y !== undefined && scale.y.constructor === Number) this.scale.y = scale.y;
    if (scale.z !== undefined && scale.z.constructor === Number) this.scale.z = scale.z;
}

Style.prototype.parseScaleArrayInitialiser = function(scale) {
    if (scale[0] !== undefined && scale[0].constructor === Number) this.scale.x = scale[0];
    if (scale[1] !== undefined && scale[1].constructor === Number) this.scale.y = scale[1];
    if (scale[2] !== undefined && scale[2].constructor === Number) this.scale.z = scale[2];
}

Style.prototype.parseSkew = function(skew) {
    if (skew.constructor === Array) this.parseSkewArrayInitialiser(skew);
    if (skew.constructor === Object) this.parseSkewObjectInitialiser(skew);
    if (skew.constructor === Number) this.skew.x = this.skew.y = skew;
}

Style.prototype.parseSkewX = function(x) {
    if (x !== undefined && x.constructor === Number) this.skew.x = x;
}

Style.prototype.parseSkewY = function(y) {
    if (y !== undefined && y.constructor === Number) this.skew.y = y;
}

Style.prototype.parseSkewObjectInitialiser = function(skew) {
    if (skew.x !== undefined && skew.x.constructor === Number) this.skew.x = skew.x;
    if (skew.y !== undefined && skew.y.constructor === Number) this.skew.y = skew.y;
}

Style.prototype.parseSkewArrayInitialiser = function(skew) {
    if (skew[0] !== undefined && skew[0].constructor === Number) this.skew.x = skew[0];
    if (skew[1] !== undefined && skew[1].constructor === Number) this.skew.y = skew[1];
}

// private
Style.prototype.build = function(css) {
    var _css = {};
    // build transition properties
    _css[browser.css.property('property')] = this.transition.property;
    _css[browser.css.property('duration')] = str('{0}ms').format(this.transition.duration);
    _css[browser.css.property('delay')] = str('{0}ms').format(this.transition.delay);
    _css[browser.css.property('ease')] = this.transition.ease;
    _css[browser.css.property('style')] = this.transition.style;
    // could use multiple transformation, if separate transform with space.
    _css[browser.css.property('transform')] = [this.buildTranslate(), this.buildRotate(), this.buildScale(), this.buildSkew()].join(' ');
    // set filter properties
    var filter = [];
    for (var name in this.filter) {
        filter.push(this.filter[name]);
    }
    if (filter.length > 0) {
        // attach both prefixed and unprefixed filer property as a preventive measure
        _css[browser.css.property('filter')] = filter.join(' ');
        _css['filter'] = filter.join(' ');
    }
    // prefix free helps you from vendor prefix hell
    for (var name in css) {
        _css[browser.css.property(name)] = css[name];
        // have to attach non prefixed property. try opacity css property.
        _css[name] = css[name];
    }
    return _css;
}

Style.prototype.buildTranslate = function() {
    return str('translate3d({0}px,{1}px,{2}px)').format(
        this.position.x || 0,
        this.position.y || 0,
        this.position.z || 0
    );
}

Style.prototype.buildRotate = function() {
    return [
        this.buildRotateX(),
        this.buildRotateY(),
        this.buildRotateZ()
    ].join(' ');
}

Style.prototype.buildRotateX = function() {
    return str('rotateX({0}deg)').format(
        this.rotation.x || 0
    );
}

Style.prototype.buildRotateY = function() {
    return str('rotateY({0}deg)').format(
        this.rotation.y || 0
    );
}

Style.prototype.buildRotateZ = function() {
    return str('rotateZ({0}deg)').format(
        this.rotation.z || 0
    );
}

Style.prototype.buildScale = function() {
    return str('scale3d({0},{1},{2})').format(
        this.scale.x,
        this.scale.y,
        this.scale.z
    );
}

Style.prototype.buildSkew = function() {
    // Here is the alternate of `skew({x}deg,{y}deg)` which is something wrong.
    // If use that specification, we would get unexpected result.
    return [
        this.buildSkewX(),
        this.buildSkewY()
    ].join(' ');
}

Style.prototype.buildSkewX = function() {
    return str('skewX({0}deg)').format(
        this.skew.x || 0
    );
}

Style.prototype.buildSkewY = function() {
    return str('skewY({0}deg)').format(
        this.skew.y || 0
    );
}


Style.prototype.buildGrayscale = function(value) {
    return str('grayscale({0}%)').format(
        value || 0
    );
}

Style.prototype.buildSepia = function(value) {
    return str('sepia({0}%)').format(
        value || 0
    );
}

Style.prototype.buildSaturate = function(value) {
    return str('saturate({0}%)').format(
        value || 0
    );
}

Style.prototype.buildHueRotate = function(value) {
    return str('hue-rotate({0}deg)').format(
        value || 0
    );
}

Style.prototype.buildInvert = function(value) {
    return str('invert({0}%)').format(
        value || 0
    );
}

Style.prototype.buildOpacity = function(value) {
    return str('opacity({0}%)').format(
        value || 0
    );
}

Style.prototype.buildBrightness = function(value) {
    return str('brightness({0}%)').format(
        value || 0
    );
}

Style.prototype.buildContrast = function(value) {
    return str('contrast({0}%)').format(
        value || 0
    );
}

Style.prototype.buildBlur = function(value) {
    return str('blur({0}px)').format(
        value || 0
    );
}

Style.prototype.buildDropShadow = function(value) {
    if (value.constructor === Array) return this.buildDropShadowArrayInitialiser(value);
    return 'drop-shadow(0px 0px)'; // no drop-shadow affected
}

Style.prototype.buildDropShadowArrayInitialiser = function(value) {
    
    var color = '';
    
    value.forEach(function(v, i) {
        if (v.constructor === String && !v.match(/^[0-9]+/)) {
            color = v;
            value.splice(i, 1);
        }
    });
    
    if (value.length === 2) {
        return str('drop-shadow({0}px {1}px {2})').format(
            value[0] || 0, // offset-x
            value[1] || 0, // offset-y
            color || '#000000'
        );
    }
    
    if (value.length === 3) {
        return str('drop-shadow({0}px {1}px {2}px {3})').format(
            value[0] || 0, // offset-x
            value[1] || 0, // offset-y
            value[2] || 0, // blur-radius
            color || '#000000'
        );
    }
    
    if (value.length === 4) {
        return str('drop-shadow({0}px {1}px {2}px {3} {4})').format(
            value[0] || 0, // offset-x
            value[1] || 0, // offset-y
            value[2] || 0, // blur-radius
            value[3] || 0, // spread-radius. Positive values will cause the shadow to expand and grow bigger, negative values will cause the shadow to shrink.
            color || '#000000'
        );
    }
}

Style.prototype.buildShader = function(value) {
    throw 'shader property is not implemented';
}