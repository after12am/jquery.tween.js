var Style = function(elem) {
    this.elem = elem;
    this.transition = {};
    this.position = { x: 0, y: 0, z: 0 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.scale = { x: 1, y: 1, z: 1 };
    this.skew = { x: 0, y: 0 };
    // If set default value on all filter parameters, continuous animation would correctly work.
    // If not so, it is suddenly switched to blurred after end of the sepia turn.
    // e.g. $('.any').cssanimate({filter: {sepia: 80}}).cssanimate({filter: {blur: 10}});
    this.filter = {
        contrast: this.buildContrast(100),
        brightness: this.buildBrightness(100),
        grayscale: this.buildGrayscale(0),
        saturate: this.buildSaturate(100),
        opacity: this.buildOpacity(100),
        invert: this.buildInvert(0),
        'hue-rotate': this.buildHueRotate(0),
        sepia: this.buildSepia(0),
        blur: this.buildBlur(0),
        'drop-shadow': this.buildDropShadow([0, 0, '#000'])
    };
};

// return vendor prefix
Style.prefix = (function() {
    var e = $('<div>')[0];
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
})();

Style.transitionEvent = (function() {
    var e = $('<div>')[0];
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
})();

Style.property = function(name) {
    var e = $('<div>')[0];
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
        prefix,
        name
    );
    if (translate[name]) return translate[name];
    // free from vendor prefix
    if (e.style[with_prefix] !== undefined) return with_prefix;
    return name;
}

Style.prototype.compile = function(params, duration, delay, ease, style, property, callback) {
    this.transition = {
        duration: typeof duration === 'number' ? duration : 400, // Specifies the amount of time it takes to change.
        delay: delay || 0, // Specifies whether the change begins when.
        ease: Ease[ease] || ease || 'ease-in-out', // Specifies the timing of the change.
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
            if ($(that.elem).css(Style.property('duration'))) break;
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
                if ($(that.elem).css(Style.property('duration')).match(/^0/)) break;
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
    this.parseTranslateX(to.x);
    this.parseTranslateY(to.y);
    this.parseTranslateZ(to.z);
}

Style.prototype.parseTranslateArrayInitialiser = function(to) {
    this.parseTranslateX(to[0]);
    this.parseTranslateY(to[1]);
    this.parseTranslateZ(to[2]);
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
    this.parseRotateX(rotation.x);
    this.parseRotateY(rotation.y);
    this.parseRotateZ(rotation.z);
}

Style.prototype.parseRotateArrayInitialiser = function(rotation) {
    this.parseRotateX(rotation[0]);
    this.parseRotateY(rotation[1]);
    this.parseRotateZ(rotation[2]);
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
    this.parseScaleX(scale.x);
    this.parseScaleY(scale.y);
    this.parseScaleZ(scale.z);
}

Style.prototype.parseScaleArrayInitialiser = function(scale) {
    this.parseScaleX(scale[0]);
    this.parseScaleY(scale[1]);
    this.parseScaleZ(scale[2]);
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
    this.parseSkewX(skew.x);
    this.parseSkewY(skew.y);
}

Style.prototype.parseSkewArrayInitialiser = function(skew) {
    this.parseSkewX(skew[0]);
    this.parseSkewY(skew[1]);
}

// private
Style.prototype.build = function(css) {
    var _css = {};
    // build transition properties
    _css[Style.property('property')] = this.transition.property;
    _css[Style.property('duration')] = str('{0}ms').format(this.transition.duration);
    _css[Style.property('delay')] = str('{0}ms').format(this.transition.delay);
    _css[Style.property('ease')] = this.transition.ease;
    _css[Style.property('style')] = this.transition.style;
    // could use multiple transformation, if separate transform with space.
    _css[Style.property('transform')] = [this.buildTranslate(), this.buildRotate(), this.buildScale(), this.buildSkew()].join(' ');
    // set filter properties
    var filter = [];
    for (var name in this.filter) {
        filter.push(this.filter[name]);
    }
    if (filter.length > 0) {
        // attach both prefixed and unprefixed filer property as a preventive measure
        _css[Style.property('filter')] = filter.join(' ');
        _css['filter'] = filter.join(' ');
    }
    // prefix free helps you from vendor prefix hell
    for (var name in css) {
        _css[Style.property(name)] = css[name];
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
    return 'drop-shadow(0px 0px #000)'; // no drop-shadow affected
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
            color || '#000'
        );
    }
    
    if (value.length === 3) {
        return str('drop-shadow({0}px {1}px {2}px {3})').format(
            value[0] || 0, // offset-x
            value[1] || 0, // offset-y
            value[2] || 0, // blur-radius
            color || '#000'
        );
    }
    
    if (value.length === 4) {
        return str('drop-shadow({0}px {1}px {2}px {3} {4})').format(
            value[0] || 0, // offset-x
            value[1] || 0, // offset-y
            value[2] || 0, // blur-radius
            value[3] || 0, // spread-radius. Positive values will cause the shadow to expand and grow bigger, negative values will cause the shadow to shrink.
            color || '#000'
        );
    }
    return 'drop-shadow(0px 0px #000)'; // no drop-shadow affected
}

Style.prototype.buildShader = function(value) {
    throw 'shader property is not implemented';
}