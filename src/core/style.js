var Style = function(duration, delay, easing, style) {
    this.css = {};
    this.transform = [];
    this.transition = {
        properties: ['all'], // Specifies the name of the CSS properties that apply the transition effect.
        duration: typeof duration === 'number' ? duration : 400, // Specifies the amount of time it takes to change.
        delay: delay || 0, // Specifies whether the change begins when.
        easing: easing || 'ease-in-out', // Specifies the timing of the change.
        //origin: origin || '50% 50%', // Specify the origin.
        style: style || 'flat' // or preserve-3d
    };
};

// declaration as const for the purpose of cache
Style.prefix = prefix();
Style.onTransitionEvent = transitionEvent();
Style.prototype.assemble = function(params) {
    
    /*
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
    */
    
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
                params.rotate['x'] || 0, 
                params.rotate['y'] || 0, 
                params.rotate['z'] || 0, 
                params.rotate['rotate']
            ));
        }
        if (params.rotate[0] != undefined) {
            this.transform.push('rotate3d({0},{1},{2},{3}deg)'.format(
                params.rotate[0] || 0, 
                params.rotate[1] || 0, 
                params.rotate[2] || 0, 
                params.rotate[3] || 0
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
                params.scale['x'] || 0,
                params.scale['y'] || 0,
                params.scale['z'] || 0
            ));
        }
        if (params.scale[0] != undefined) {
            this.transform.push('scale3d({0},{1},{2})'.format(
                params.scale[0] || 0,
                params.scale[1] || 0,
                params.scale[2] || 0
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
                params.skew['x'] || 0,
                params.skew['y'] || 0
            ));
        }
        if (params.skew[0] != undefined) {
            this.transform.push('skew({0}deg,{1}deg)'.format(
                params.skew[0] || 0,
                params.skew[1] || 0
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
    
    var props = {};
    props['{0}transition-property'.format(Style.prefix)] = this.transition.properties.join(',');
    props['{0}transition-duration'.format(Style.prefix)] = this.transition.duration + 'ms';
    props['{0}transition-timing-function'.format(Style.prefix)] = this.transition.easing;
    props['{0}transition-delay'.format(Style.prefix)] = this.transition.delay + 'ms';
    props['{0}transform'.format(Style.prefix)] = this.transform.join(' '); // If you separate transform function, you can apply multiple transform effects.
    //props['{0}transform-origin'.format(Style.prefix)] = this.transition.origin;
    props['{0}transform-style'.format(Style.prefix)] = this.transition.style;
    
    this.css = $.extend(props, params);
    return this;
};