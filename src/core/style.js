
var Style = function(params, duration, delay, easing) {
    
    if (params.duration) {
        duration = params.duration;
        delete params.duration;
    }
    
    if (params.delay) {
        delay = params.delay;
        delete params.delay;
    }
    
    if (params.easing) {
        easing = params.easing;
        delete params.easing;
    }
    
    var origin, style;
    
    if (params.origin) {
        origin = params.origin;
        delete params.origin;
    }
    
    if (params.style) {
        origin = params.style;
        delete params.style;
    }
    
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

Style.prototype.build = function() {
    
    if (this.transition.properties.length == 0) {
        this.transition.properties = ['all'];
    }
    
    var properties = {
        '-webkit-transition-property': this.transition.properties.join(','),
        '-webkit-transition-duration': this.transition.duration + 'ms',
        '-webkit-transition-timing-function': this.transition.easing,
        '-webkit-transition-delay': this.transition.delay + 'ms',
        '-webkit-transform': this.transform.join(' '), // If you separate transform function, you can apply multiple transform effects.
        '-webkit-transform-origin': this.transition.origin,
        '-webkit-transform-style': this.transition.style
    };
    
    return $.extend(properties, this.css);
};

Style.prototype.parse = function(params) {
    
    // translate
    if (typeof params.position == 'object') {
        
        if (params.position['x']) {
            this.transform.push('translate3d(' + params.position['x'] + 'px,' + params.position['y'] + 'px,' + params.position['z'] + 'px)');
        }
        
        if (params.position[0]) {
            this.transform.push('translate3d(' + params.position[0] + 'px,' + params.position[1] + 'px,' + params.position[2] + 'px)');
        }
        
        delete params.position;
        delete params.x;
        delete params.y;
        delete params.z;
    }
    
    if (params.x && params.y && params.z) {
        this.transform.push('translate3d(' + params.x + 'px,' + params.y + 'px,' + params.z + 'px)');
        delete params.x;
        delete params.y;
        delete params.z;
    }
    
    if (params.x && params.y) {
        this.transform.push('translate(' + params.x + 'px,' + params.y + 'px)');
        delete params.x;
        delete params.y;
    }
    
    if (params.x) {
        this.transform.push('translateX(' + params.x + 'px)');
        delete params.x;
    }
    
    if (params.y) {
        this.transform.push('translateY(' + params.y + 'px)');
        delete params.y;
    }
    
    if (params.z) {
        this.transform.push('translateZ(' + params.z + 'px)');
        delete params.z;
    }
    
    // rotate
    if (typeof params.rotate == 'object') {
        
        if (params.rotate['x']) {
            this.transform.push('rotate3d(' + params.rotate['x'] + ',' + params.rotate['y'] + ',' + params.rotate['z'] + ',' + params.rotate['rotate'] + 'deg)');
        }
        
        if (params.rotate[0]) {
            this.transform.push('rotate3d(' + params.rotate[0] + ',' + params.rotate[1] + ',' + params.rotate[2] + ',' + params.rotate[3] + 'deg)');
        }
        
        delete params.rotate;
        delete params.rotatex;
        delete params.rotatey;
        delete params.rotatez;
    }
    
    if (params.rotate) {
        this.transform.push('rotate(' + params.rotate + 'deg)');
        delete params.rotate;
    }
    
    if (params.rotatex) {
        this.transform.push('rotateX(' + params.rotatex + 'deg)');
        delete params.rotatex;
    }
    
    if (params.rotatey) {
        this.transform.push('rotateY(' + params.rotatey + 'deg)');
        delete params.rotatey;
    }
    
    if (params.rotatez) {
        this.transform.push('rotateZ(' + params.rotatez + 'deg)');
        delete params.rotatez;
    }
    
    // scale
    if (typeof params.scale == 'object') {

        if (params.scale['x']) {
            this.transform.push('scale3d(' + params.scale['x'] + ',' + params.scale['y'] + ',' + params.scale['z'] + ')');
        }
        
        if (params.scale[0]) {
            this.transform.push('scale3d(' + params.scale[0] + ',' + params.scale[1] + ',' + params.scale[2] + ')');
        }

        delete params.scale;
        delete params.scalex;
        delete params.scaley;
        delete params.scalez;
    }
    
    if (params.scale) {
        this.transform.push('scale(' + params.scale + ',' + params.scale + ')');
        delete params.scale;
    }

    if (params.scalex) {
        this.transform.push('scaleX(' + params.scalex + ')');
        delete params.scalex;
    }

    if (params.scaley) {
        this.transform.push('scaleY(' + params.scaley + ')');
        delete params.scaley;
    }

    if (params.scalez) {
        this.transform.push('scaleZ(' + params.scalez + ')');
        delete params.scalez;
    }
    
    // skew
    if (typeof params.skew == 'object') {
        
        if (params.skew['x']) {
            this.transform.push('skew(' + params.skew['x'] + 'deg,' + params.skew['y'] + 'deg)');
        }

        if (params.skew[0]) {
            this.transform.push('skew(' + params.skew[0] + 'deg,' + params.skew[1] + 'deg)');
        }
        
        delete params.skew;
        delete params.skewx;
        delete params.skewy;
    }
    
    if (params.skewx) {
        this.transform.push('skewX(' + params.skewx + 'deg)');
        delete params.skewx;
    }
    
    if (params.skewy) {
        this.transform.push('skewY(' + params.skewy + 'deg)');
        delete params.skewy;
    }
    
    if (params.property) {
        
        if (typeof params.property == 'object') {
            this.transition.properties = params.property;
        }
        
        if (typeof params.property == 'string') {
            this.transition.properties.push(params.property);
        }
        
        delete params.property;
    }
    
    this.css = params;
    
    return this;
};