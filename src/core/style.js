
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

var Style = function(elem, params, duration, delay, easing, origin, style, callback) {
    
    this.elem = elem;
    this.callback = callback;
    this.css = {};
    this.transform = [];
    
    this.transition = {
        properties: [], // Specifies the name of the CSS properties that apply the transition effect.
        duration: duration || 0, // Specifies the amount of time it takes to change.
        delay: delay || 0, // Specifies whether the change begins when.
        easing: easing || 'ease', // Specifies the timing of the change.
        origin: origin || '50% 50%', // Specify the origin.
        style: style || 'flat' // or preserve-3d
    };
    
    this.parse(params);
};

Style.prototype.adopt = function() {
    
    if (this.transition.properties.length == 0) {
        this.transition.properties = ['all'];
    }
    
    var properties = {
        '-webkit-transition-property': this.transition.properties.join(','),
        '-webkit-transition-duration': this.transition.duration + 'ms',
        '-webkit-transition-timing-function': this.transition.easing,
        '-webkit-transition-delay': this.transition.delay + 'ms',
        '-webkit-transform': this.transform.join(' '), // If you separate transform function, you can apply multiple transform effects.
        // '-webkit-transform-origin': this.transition.origin,
        // '-webkit-transform-style': this.transition.style
    };
    
    var onTransitionEvent = whichTransitionEvent();
    var that = this;
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
        this.transform.push('translate3d(' + params.x + 'px,' + params.y + 'px,' + params.z + 'px)');
        delete params.x;
        delete params.y;
        delete params.z;
    }
    
    if (params.x != undefined && params.y != undefined) {
        this.transform.push('translate(' + params.x + 'px,' + params.y + 'px)');
        delete params.x;
        delete params.y;
    }
    
    if (params.x != undefined) {
        this.transform.push('translateX(' + params.x + 'px)');
        delete params.x;
    }
    
    if (params.y != undefined) {
        this.transform.push('translateY(' + params.y + 'px)');
        delete params.y;
    }
    
    if (params.z != undefined) {
        this.transform.push('translateZ(' + params.z + 'px)');
        delete params.z;
    }
    
    // rotate
    if (typeof params.rotate == 'object') {
        
        if (params.rotate['x'] != undefined) {
            this.transform.push('rotate3d(' + params.rotate['x'] + ',' + params.rotate['y'] + ',' + params.rotate['z'] + ',' + params.rotate['rotate'] + 'deg)');
        }
        
        if (params.rotate[0] != undefined) {
            this.transform.push('rotate3d(' + params.rotate[0] + ',' + params.rotate[1] + ',' + params.rotate[2] + ',' + params.rotate[3] + 'deg)');
        }
        
        delete params.rotate;
        delete params.rotatex;
        delete params.rotatey;
        delete params.rotatez;
    }
    
    if (params.rotate != undefined) {
        this.transform.push('rotate(' + params.rotate + 'deg)');
        delete params.rotate;
    }
    
    if (params.rotatex != undefined) {
        this.transform.push('rotateX(' + params.rotatex + 'deg)');
        delete params.rotatex;
    }
    
    if (params.rotatey != undefined) {
        this.transform.push('rotateY(' + params.rotatey + 'deg)');
        delete params.rotatey;
    }
    
    if (params.rotatez != undefined) {
        this.transform.push('rotateZ(' + params.rotatez + 'deg)');
        delete params.rotatez;
    }
    
    // scale
    if (typeof params.scale == 'object') {

        if (params.scale['x'] != undefined) {
            this.transform.push('scale3d(' + params.scale['x'] + ',' + params.scale['y'] + ',' + params.scale['z'] + ')');
        }
        
        if (params.scale[0] != undefined) {
            this.transform.push('scale3d(' + params.scale[0] + ',' + params.scale[1] + ',' + params.scale[2] + ')');
        }

        delete params.scale;
        delete params.scalex;
        delete params.scaley;
        delete params.scalez;
    }
    
    if (params.scale != undefined) {
        this.transform.push('scale(' + params.scale + ',' + params.scale + ')');
        delete params.scale;
    }

    if (params.scalex != undefined) {
        this.transform.push('scaleX(' + params.scalex + ')');
        delete params.scalex;
    }

    if (params.scaley != undefined) {
        this.transform.push('scaleY(' + params.scaley + ')');
        delete params.scaley;
    }

    if (params.scalez != undefined) {
        this.transform.push('scaleZ(' + params.scalez + ')');
        delete params.scalez;
    }
    
    // skew
    if (typeof params.skew == 'object') {
        
        if (params.skew['x'] != undefined) {
            this.transform.push('skew(' + params.skew['x'] + 'deg,' + params.skew['y'] + 'deg)');
        }

        if (params.skew[0] != undefined) {
            this.transform.push('skew(' + params.skew[0] + 'deg,' + params.skew[1] + 'deg)');
        }
        
        delete params.skew;
        delete params.skewx;
        delete params.skewy;
    }
    
    if (params.skewx != undefined) {
        this.transform.push('skewX(' + params.skewx + 'deg)');
        delete params.skewx;
    }
    
    if (params.skewy != undefined) {
        this.transform.push('skewY(' + params.skewy + 'deg)');
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