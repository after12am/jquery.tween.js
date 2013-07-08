var Style = function(elem) {
    this.elem = elem;
    this.executable = {};
    this.position = new Vector3();
    this.rotation = new Vector3();
    this.scale = new Vector3(1, 1, 1);
    this.skew = new Vector2();
};

// return vendor prefix
Style.prefix = (function () {
    var styles = window.getComputedStyle(document.documentElement, '');
    var pre = (Array.prototype
        .slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1];
    var dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return str('-{0}-').format(pre);
})();

Style.transitionEvent = (function() {
    var e = $('<div>')[0];
    // firefox supports from v4.0
    // see // https://developer.mozilla.org/en-US/docs/Web/Reference/Events/transitionend
    var transitions = {
        '-webkit-': 'webkitTransitionEnd',
        '-moz-': 'transitionend',
        '-ms-': 'msTransitionEnd',
        '-o-': 'webkitTransitionEnd'// opera is fork of webkit now
    };
    for (var t in transitions) if (Style.prefix === t) return transitions[t];
    if('transitionend' in e.style) return 'transitionend';
    return null;
})();

Style.property = function(name) {
    var e = $('<div>')[0];
    var prefix = Style.prefix;
    var with_prefix = str('{0}{1}').format(
        prefix,
        name
    );
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

Style.prototype.clear = function() {
    // clear related with transformation properties except transform
    var clear = {}, _ = [
        'transition-property',
        'transition-timing-function',
        'transition-duration',
        'transform-style',
        'transition-delay'
    ];
    _.forEach(function(i) {
        clear[Style.property(i)] = '';
    });
    $(this).css(clear);
}

Style.prototype.queue = function(callback) {
    var that = this;
    var duration = Style.property('transition-duration');
    var animate = function() {
        this.is_animated = true;
        // callback that would execute after transition
        var animated = function() {
            $(this).unbind(Style.transitionEvent, $.proxy(animated, this));
            if (typeof callback === 'function') $.proxy(callback, this)();
            this.is_animated = false;
            $(this).dequeue();
            if ($(this).queue().length === 0) $.proxy(that.clear, this)();
        }
        // could animate with this even just after element have been appended to dom
        var i = 0;
        while (1) {
            if ($(this).css(duration)) break;
            if (++i > 50) break; // avoid infinite loop
        }
        // When transition-duration propery is zero, we have to call callback function 
        // because transitionEvent would not be fired.
        if (that.executable[duration].match(/^0/)) {
            $(this).css(that.executable);
            // We have to wait until css property is set.
            // If not so, next queue might be executed before setting css to dom.
            var i = 0;
            while (1) {
                if ($(this).css(duration).match(/^0/)) break;
                if (++i > 50) break; // avoid infinite loop
            }
            // alternate callback process of animate()
            if (typeof callback === 'function') $.proxy(callback, this)();
            if ($(this).queue().length === 0) $.proxy(that.clear, this)();
            this.is_animated = false;
            $(this).dequeue();
            return this;
        }
        // run this alternate if transitEvent is not supported
        if (!Style.transitionEvent) {
            $(this).css(that.executable);
            var m = that.executable[duration].match(/^([0-9]+)/);
            setTimeout($.proxy(callback, this), m[1]);
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
    this.parseRelativeValue(params);
    for (var name in params) {
        if (name == 'to') this.parseTranslate(params[name]);
        else if (name === 'x') this.position.x = +params[name];
        else if (name === 'y') this.position.y = +params[name];
        else if (name === 'z') this.position.z = +params[name];
        else if (name === 'rotate') this.parseRotation(params[name]);
        else if (name === 'rotatex') this.rotation.x = +params[name];
        else if (name === 'rotatey') this.rotation.y = +params[name];
        else if (name === 'rotatez') this.rotation.z = +params[name];
        else if (name === 'scale') this.parseScale(params[name]);
        else if (name === 'scalex') this.scale.x = +params[name];
        else if (name === 'scaley') this.scale.y = +params[name];
        else if (name === 'scalez') this.scale.z = +params[name];
        else if (name === 'skew') this.parseSkew(params[name]);
        else if (name === 'skewx') this.skew.x = +params[name];
        else if (name === 'skewy') this.skew.y = +params[name];
        else continue;
        delete params[name];
    }
    return this;
}

Style.prototype.matchRelativeValue = function(value) {
    return value.match(/^(\+=|-=)([0-9]+)$/);
}

Style.prototype.parseRelativeValue = function(params) {
    var m, expr = function(left, op, right) {
        switch (op) {
            case '+=': return add(left, right);
            case '-=': return sub(left, right);
        }
    }
    for (var name in params) {
        if (params[name].constructor === String) {
            var m;
            if (!(m = this.matchRelativeValue(params[name]))) continue;
            switch (name) {
                case 'to': params[name] = expr(this.position.x, m[1], +m[2]); continue;
                case 'x': params[name] = expr(this.position.x, m[1], +m[2]); continue;
                case 'y': params[name] = expr(this.position.y, m[1], +m[2]); continue;
                case 'z': params[name] = expr(this.position.z, m[1], +m[2]); continue;
                case 'rotate': params[name] = expr(this.rotation.z, m[1], +m[2]); continue;
                case 'rotatex': params[name] = expr(this.rotation.x, m[1], +m[2]); continue;
                case 'rotatey': params[name] = expr(this.rotation.y, m[1], +m[2]); continue;
                case 'rotatez': params[name] = expr(this.rotation.z, m[1], +m[2]); continue;
                case 'scale': params[name] = [expr(this.scale.x, m[1], +m[2]), expr(this.scale.y, m[1], +m[2])]; continue;
                case 'scalex': params[name] = expr(this.scale.x, m[1], +m[2]); continue;
                case 'scaley': params[name] = expr(this.scale.y, m[1], +m[2]); continue;
                case 'scalez': params[name] = expr(this.scale.z, m[1], +m[2]); continue;
                case 'skew': params[name] = [expr(this.skew.x, m[1], +m[2]), expr(this.skew.y, m[1], +m[2])]; continue;
                case 'skewx': params[name] = expr(this.skew.x, m[1], +m[2]); continue;
                case 'skewy': params[name] = expr(this.skew.y, m[1], +m[2]); continue;
            }
        }
        if (params[name].constructor === Array
         || params[name].constructor === Object) {
            if (name === 'to' || name === 'rotate' || name === 'scale' || name === 'skew') {
                var v, m;
                switch (name) {
                    case 'to': v = this.position; break;
                    case 'rotate': v = this.rotation; break;
                    case 'scale': v = this.scale; break;
                    case 'skew': v = this.skew; break;
                }
                if (params[name].constructor === Array) {
                    params[name] = {
                        x: params[name][0],
                        y: params[name][1],
                        z: params[name][2]
                    };
                }
                if (params[name].x !== undefined) if (params[name].x.constructor === String) if (m = this.matchRelativeValue(params[name].x)) params[name].x = expr(v.x, m[1], +m[2]);
                if (params[name].y !== undefined) if (params[name].y.constructor === String) if (m = this.matchRelativeValue(params[name].y)) params[name].y = expr(v.y, m[1], +m[2]);
                if (params[name].z !== undefined) if (params[name].z.constructor === String) if (m = this.matchRelativeValue(params[name].z)) params[name].z = expr(v.z, m[1], +m[2]);
            }
        }
    }
}

Style.prototype.parseTranslate = function(to) {
    if (to.constructor === Array) {
        if (to[0] !== undefined) this.position.x = +to[0];
        if (to[1] !== undefined) this.position.y = +to[1];
        if (to[2] !== undefined) this.position.z = +to[2];
        return;
    }
    if (to.constructor === Object) {
        if (to.x !== undefined) this.position.x = +to.x;
        if (to.y !== undefined) this.position.y = +to.y;
        if (to.z !== undefined) this.position.z = +to.z;
        return;
    }
    this.position.x = +to;
}

Style.prototype.parseRotation = function(rotation) {
    if (rotation.constructor === Array) {
        if (rotation[0] !== undefined) this.rotation.x = +rotation[0];
        if (rotation[1] !== undefined) this.rotation.y = +rotation[1];
        if (rotation[2] !== undefined) this.rotation.z = +rotation[2];
        return;
    }
    if (rotation.constructor === Object) {
        if (rotation.x !== undefined) this.rotation.x = +rotation.x;
        if (rotation.y !== undefined) this.rotation.y = +rotation.y;
        if (rotation.z !== undefined) this.rotation.z = +rotation.z;
        return;
    }
    this.rotation.z = +rotation;
}

Style.prototype.parseScale = function(scale) {
    if (scale.constructor === Array) {
        if (scale[0] !== undefined) this.scale.x = +scale[0];
        if (scale[1] !== undefined) this.scale.y = +scale[1];
        if (scale[2] !== undefined) this.scale.z = +scale[2];
        return;
    }
    if (scale.constructor === Object) {
        if (scale.x !== undefined) this.scale.x = +scale.x;
        if (scale.y !== undefined) this.scale.y = +scale.y;
        if (scale.z !== undefined) this.scale.z = +scale.z;
        return;
    }
    this.scale.x = this.scale.y = +scale;
}

Style.prototype.parseSkew = function(skew) {
    if (skew.constructor === Array) {
        if (skew[0] !== undefined) this.skew.x = +skew[0];
        if (skew[1] !== undefined) this.skew.y = +skew[1];
        return;
    }
    if (skew.constructor === Object) {
        if (skew.x !== undefined) this.skew.x = +skew.x;
        if (skew.y !== undefined) this.skew.y = +skew.y;
        return;
    }
    this.skew.x = this.skew.y = +skew;
}

// private
Style.prototype.build = function(transition, params) {
    var executable = {};
    executable[Style.property('transition-property')] = transition.property;
    executable[Style.property('transition-duration')] = str('{0}ms').format(transition.duration);
    executable[Style.property('transition-delay')] = str('{0}ms').format(transition.delay);
    executable[Style.property('transition-timing-function')] = transition.ease;
    executable[Style.property('transform-style')] = transition.style;
    executable[Style.property('transform')] = [this.buildTranslate(), this.buildRotate(), this.buildScale(), this.buildSkew()].join(' ');
    // prefix free helps you from vendor prefix hell
    // have to attach prefixed and non prefixed property. try transform property like this.
    // $box.cssanimate({ transform: 'translateX(32px)' });
    for (var name in params) {
        executable[Style.property(name)] = params[name];
        executable[name] = params[name];
    }
    return executable;
}

Style.prototype.buildTranslate = function() {
    if (Style.prefix === '-o-') return this.buildOTranslate();
    return str('translate3d({0}px,{1}px,{2}px)').format(
        this.position.x,
        this.position.y,
        this.position.z
    );
}

// opera does not support 3d transformation, only support 2d transformation
Style.prototype.buildOTranslate = function() {
    return str('translate({0}px,{1}px)').format(
        this.position.x,
        this.position.y
    );
}

Style.prototype.buildRotate = function() {
    if (Style.prefix === '-o-') return this.buildORotate();
    return str('rotateX({0}deg) rotateY({1}deg) rotateZ({2}deg)').format(
        this.rotation.x,
        this.rotation.y,
        this.rotation.z
    );
}

// opera does not support 3d transformation, only support 2d transformation
Style.prototype.buildORotate = function() {
    return str('rotate({0}deg)').format(
        this.rotation.z
    );
}

Style.prototype.buildScale = function() {
    return str('scale({0},{1})').format(
        this.scale.x,
        this.scale.y
    );
}

// Here is the alternate of `skew({x}deg,{y}deg)` which is something wrong.
// If use that specification, we would get unexpected result.
Style.prototype.buildSkew = function() {
    return str('skewX({0}deg) skewY({1}deg)').format(
        this.skew.x,
        this.skew.y
    );
}