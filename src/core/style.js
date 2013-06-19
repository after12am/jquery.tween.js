var Style = function(elem) {
    this.elem = elem;
    this.executable = {};
    this.position = new Vector3(0, 0, 0);
    this.rotation = new Vector3(0, 0, 0);
    this.scale = new Vector3(1, 1, 1);
    this.skew = new Vector2(0, 0);
    // If set default value on all filter parameters, continuous animation would correctly work.
    // If not so, it is suddenly switched to blurred after end of the sepia turn.
    // e.g. $('.any').cssanimate({filter: {sepia: 80}}).cssanimate({filter: {blur: 10}});
    this.filter = {
        contrast: 100,
        brightness: 100,
        grayscale: 0,
        saturate: 100,
        opacity: 100,
        invert: 0,
        hue: 0,
        sepia: 0,
        blur: 0,
        shadow: ['rgb(0, 0, 0)', 0, 0]
    };
};

// return vendor prefix
Style.prefix = (function() {
    var e = $('<div>')[0];
    var prefixes = {
        WebkitTransition: '-webkit-',
        MozTransition: '-moz-',
        MSTransition: '-ms-',
        OTransition: '-o-'
    };
    for (p in prefixes) {
        if(p in e.style) {
            return prefixes[p];
        }
    }
    return '';
})();

Style.transitionEvent = (function() {
    var e = $('<div>')[0];
    var transitions = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'mozTransitionend',
        MSTransition: 'msTransitionEnd',
        OTransition: 'oTransitionEnd'
    };
    for (var t in transitions) {
        if(t in e.style) {
            return transitions[t];
        }
    }
    return 'transitionEnd';
})();

Style.property = function(name) {
    var e = $('<div>')[0];
    var prefix = Style.prefix;
    var translate = {
        transform: str('{0}transform').format(prefix),
        origin: str('{0}transform-origin').format(prefix),
        duration: str('{0}transition-duration').format(prefix),
        property: str('{0}transition-property').format(prefix),
        delay: str('{0}transition-delay').format(prefix),
        ease: str('{0}transition-timing-function').format(prefix),
        style: str('{0}transition-style').format(prefix),
        perspective: str('{0}perspective').format(prefix)
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

Style.prototype.compile = function(transition, params) {
    // parse cssanimate properties and take over the values
    this.parse(params);
    // deep copy for avoiding to overwrite by the time lag
    this.executable = $.extend(true, {}, this.build(transition, params));
    return this;
}

// private
Style.prototype.queue = function(callback) {
    var that = this;
    var animate = function() {
        this.is_animated = true;
        // callback that would execute after transition
        var animated = function() {
            $(this).unbind(Style.transitionEvent, $.proxy(animated, this));
            if (typeof callback === 'function') $.proxy(callback, this)();
            $(this).dequeue();
            this.is_animated = false;
        }
        // could animate with this even just after element have been appended to dom
        var i = 0;
        while (1) {
            if ($(this).css(Style.property('duration'))) break;
            if (++i > 50) break; // avoid infinite loop
        }
        // When transition-duration propery is zero, we have to call callback function 
        // because transitionEvent would not be fired.
        if (that.executable[Style.property('duration')].match(/^0/)) {
            $(this).css(that.executable);
            // We have to wait until css property is set.
            // If not so, next queue might be executed before setting css to dom.
            var i = 0;
            while (1) {
                if ($(this).css(Style.property('duration')).match(/^0/)) break;
                if (++i > 50) break; // avoid infinite loop
            }
            // alternate callback process of animate()
            if (typeof callback === 'function') $.proxy(callback, this)();
            $(this).dequeue();
            return this;
        }
        // transition-duration propery is set with condition of (> 0)
        // transitionEnd event will completely fired.
        $(this).bind(Style.transitionEvent, $.proxy(animated, this)).css(that.executable);
        return this;
    };
    // jquery bug of [Ticket #6576](http://bugs.jquery.com/ticket/6576) seems to be still in remained
    // test code is: $('.box').cssanimate({ x: 100 }).cssanimate({ y: -100 }).cssanimate({ y: 100 });
    if (this.elem.is_animated) {
        setTimeout($.proxy(animate, this.elem));
        return this;
    }
    $.proxy(animate, this.elem)();
    return this;
}

// private
Style.prototype.parse = function(params) {
    var m;
    var v;
    
    params.filter = params.filter || {};
    params.filter.grayscale = params.filter.grayscale || this.filter.grayscale;
    params.filter.sepia = params.filter.sepia || this.filter.sepia;
    params.filter.saturate = params.filter.saturate || this.filter.saturate;
    params.filter.hue = params.filter.hue || this.filter.hue;
    params.filter.invert = params.filter.invert || this.filter.invert;
    params.filter.opacity = params.filter.opacity || this.filter.opacity;
    params.filter.brightness = params.filter.brightness || this.filter.brightness;
    params.filter.contrast = params.filter.contrast || this.filter.contrast;
    params.filter.blur = params.filter.blur || this.filter.blur;
    params.filter.shadow = params.filter.shadow || this.filter.shadow;
    
    for (var name in params) {
        if (!params[name]) continue;
        if (params[name].constructor !== String) continue;
        if (!(m = params[name].match(/^(\+|-)=([0-9]+)$/))) continue;
        switch (name) {
            case 'x': v = this.position.x; break;
            case 'y': v = this.position.y; break;
            case 'z': v = this.position.z; break;
            case 'rotatex': v = this.rotation.x; break;
            case 'rotatey': v = this.rotation.y; break;
            case 'rotatez': v = this.rotation.z; break;
            case 'scalex': v = this.scale.x; break;
            case 'scaley': v = this.scale.y; break;
            case 'scalez': v = this.scale.z; break;
            case 'skewx': v = this.skew.x; break;
            case 'skewy': v = this.skew.y; break;
            default: continue;
        }
        switch (m[1]) {
            case '+': params[name] = add(v, (+m[2])); break;
            case '-': params[name] = sub(v, (+m[2])); break;
        }
    }
    
    for (var name in params.filter) {
        if (!params.filter[name]) continue;
        if (params.filter[name].constructor !== String) continue;
        if (!(m = params.filter[name].match(/^(\+|-)=([0-9]+)$/))) continue;
        switch (name) {
            case 'grayscale': v = this.filter.grayscale; break;
            case 'sepia': v = this.filter.sepia; break;
            case 'saturate': v = this.filter.saturate; break;
            case 'hue': v = this.filter.hue; break;
            case 'invert': v = this.filter.invert; break;
            case 'opacity': v = this.filter.opacity; break;
            case 'brightness': v = this.filter.brightness; break;
            case 'contrast': v = this.filter.contrast; break;
            case 'blur': v = this.filter.blur; break;
            case 'shadow': continue;
            default: continue;
        }
        switch (m[1]) {
            case '+': params[name] = add(v, (+m[2])); break;
            case '-': params[name] = sub(v, (+m[2])); break;
        }
    }
    
    for (var name in params) {
        if (name === 'style') delete params[name];
        else if (name === 'origin') delete params[name];
        else if (name === 'perspective') delete params[name];
        else if (name.match(/transform$/)) delete params[name];
        else if (name.match(/transform-origin$/)) delete params[name];
        else if (name.match(/transition-duration$/)) delete params[name];
        else if (name.match(/transition-property$/)) delete params[name];
        else if (name.match(/transition-delete$/)) delete params[name];
        else if (name.match(/transition-timing-function$/)) delete params[name];
        else if (name.match(/transition-style$/)) delete params[name];
    }
    
    for (var name in params) {
        if (name == 'to') this.parseTranslate(params[name]);
        else if (name === 'x') this.position.x = params[name];
        else if (name === 'y') this.position.y = params[name];
        else if (name === 'z') this.position.z = params[name];
        else if (name === 'rotate') this.parseRotation(params[name]);
        else if (name === 'rotatex') this.rotation.x = params[name];
        else if (name === 'rotatey') this.rotation.y = params[name];
        else if (name === 'rotatez') this.rotation.z = params[name];
        else if (name === 'scale') this.parseScale(params[name]);
        else if (name === 'scalex') this.scale.x = params[name];
        else if (name === 'scaley') this.scale.y = params[name];
        else if (name === 'scalez') this.scale.z = params[name];
        else if (name === 'skew') this.parseSkew(params[name]);
        else if (name === 'skewx') this.skew.x = params[name];
        else if (name === 'skewy') this.skew.y = params[name];
        else continue;
        delete params[name];
    }
    
    for (var name in params.filter) {
        switch (name) {
            case 'grayscale':
            case 'sepia':
            case 'saturate':
            case 'hue':
            case 'invert':
            case 'opacity':
            case 'brightness':
            case 'contrast':
            case 'blur':
            case 'shadow': this.filter[name] = params.filter[name]; break;
            default: continue;
        }
    }
    delete params.filter;
    
    return this;
}

// private
Style.prototype.build = function(transition, params) {
    var executable = {};
    var filter = [
        this.buildGrayscale(this.filter.grayscale),
        this.buildSepia(this.filter.sepia),
        this.buildSaturate(this.filter.saturate),
        this.buildHueRotate(this.filter.hue),
        this.buildInvert(this.filter.invert),
        this.buildOpacity(this.filter.opacity),
        this.buildBrightness(this.filter.brightness),
        this.buildContrast(this.filter.contrast),
        this.buildBlur(this.filter.blur),
        this.buildDropShadow(this.filter.shadow)
    ];
    // build transition properties
    executable[Style.property('property')] = transition.property;
    executable[Style.property('duration')] = str('{0}ms').format(transition.duration);
    executable[Style.property('delay')] = str('{0}ms').format(transition.delay);
    executable[Style.property('ease')] = transition.ease;
    executable[Style.property('style')] = transition.style;
    executable[Style.property('transform')] = [this.buildTranslate(), this.buildRotate(), this.buildScale(), this.buildSkew()].join(' ');
    // attach both prefixed and unprefixed filer property as a preventive measure
    executable[Style.property('filter')] = filter.join(' ');
    executable['filter'] = filter.join(' ');
    // prefix free helps you from vendor prefix hell
    for (var name in params) {
        executable[Style.property(name)] = params[name];
        // have to attach non prefixed property. try opacity css property.
        executable[name] = params[name];
    }
    return executable;
}

Style.prototype.parseTranslate = function(to) {
    if (to.constructor === Array) this.parseTranslateArrayInitialiser(to);
    if (to.constructor === Object) this.parseTranslateObjectInitialiser(to);
    if (to.constructor === Number) this.position.x = to;
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

Style.prototype.parseRotation = function(rotation) {
    if (rotation.constructor === Array) this.parseRotationArrayInitialiser(rotation);
    if (rotation.constructor === Object) this.parseRotationObjectInitialiser(rotation);
    if (rotation.constructor === Number) this.rotation.z = rotation;
}

Style.prototype.parseRotationObjectInitialiser = function(rotation) {
    if (rotation.x !== undefined && rotation.x.constructor === Number) this.rotation.x = rotation.x;
    if (rotation.y !== undefined && rotation.y.constructor === Number) this.rotation.y = rotation.y;
    if (rotation.z !== undefined && rotation.z.constructor === Number) this.rotation.z = rotation.z;
}

Style.prototype.parseRotationArrayInitialiser = function(rotation) {
    if (rotation[0] !== undefined && rotation[0].constructor === Number) this.rotation.x = rotation[0];
    if (rotation[1] !== undefined && rotation[1].constructor === Number) this.rotation.y = rotation[1];
    if (rotation[2] !== undefined && rotation[2].constructor === Number) this.rotation.z = rotation[2];
}

Style.prototype.parseScale = function(scale) {
    if (scale.constructor === Array) this.parseScaleArrayInitialiser(scale);
    if (scale.constructor === Object) this.parseScaleObjectInitialiser(scale);
    if (scale.constructor === Number) this.scale.x = this.scale.y = scale;
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

Style.prototype.parseSkewObjectInitialiser = function(skew) {
    if (skew.x !== undefined && skew.x.constructor === Number) this.skew.x = skew.x;
    if (skew.y !== undefined && skew.y.constructor === Number) this.skew.y = skew.y;
}

Style.prototype.parseSkewArrayInitialiser = function(skew) {
    if (skew[0] !== undefined && skew[0].constructor === Number) this.skew.x = skew[0];
    if (skew[1] !== undefined && skew[1].constructor === Number) this.skew.y = skew[1];
}

Style.prototype.buildTranslate = function() {
    return str('translate3d({0}px,{1}px,{2}px)').format(
        this.position.x || 0,
        this.position.y || 0,
        this.position.z || 0
    );
}

Style.prototype.buildRotate = function() {
    return str('rotateX({0}deg) rotateY({1}deg) rotateZ({2}deg)').format(
        this.rotation.x || 0,
        this.rotation.y || 0,
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

// Here is the alternate of `skew({x}deg,{y}deg)` which is something wrong.
// If use that specification, we would get unexpected result.
Style.prototype.buildSkew = function() {
    return str('skewX({0}deg) skewY({1}deg)').format(
        this.skew.x || 0,
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
    if (value.constructor === Array) {
        if (shadow = this.buildDropShadowArrayInitialiser(value)) {
            return shadow;
        }
    }
    // no drop-shadow affected
    return 'drop-shadow(0px 0px #000)';
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
}