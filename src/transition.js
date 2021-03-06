function Transition(elem) {
  this.elem = elem;
  this.styles = {};
}

Transition.cubicBezier = {
  'def'               : this['ease-out-quad'],
  'in'                : 'ease-in',
  'out'               : 'ease-out',
  'in-out'            : 'ease-in-out',
  // 'swing'
  // 'snap'              : 'cubic-bezier(0,1,0.5,1)',
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
  'ease-in-out-quad'  : 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
  'ease-in-out-cubic' : 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
  'ease-in-out-quart' : 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
  'ease-in-out-quint' : 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
  'ease-in-out-sine'  : 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
  'ease-in-out-expo'  : 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
  'ease-in-out-circ'  : 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
  'ease-in-out-back'  : 'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
}

Transition.prototype = {
  
  set: function(k, v) {
    var style = this.elem.style;
    var name = vendorPropName(style, k);
    this.styles[name] = v;
    return this;
  },
  
  get: function(k) {
    var style = this.elem.style;
    var name = vendorPropName(style, k);
    return this.styles[name];
  },
  
  duration: function(duration, unit) {
    var name = 'transition-duration';
    if (duration === undefined) return parseInt(this.get(name), 10);
    this.set(name, sprintf('%s%s', duration, unit === undefined ? 'ms' : ''));
    return this;
  },
  
  delay: function(delay, unit) {
    var name = 'transition-delay';
    if (delay === undefined) return parseInt(this.get(name), 10);
    this.set(name, sprintf('%s%s', delay, unit === undefined ? 'ms' : ''));
    return this;
  },
  
  easing: function(easing) {
    var name = 'transition-timing-function';
    if (easing === undefined) return this.get(name);
    this.set(name, Transition.cubicBezier[easing]);
    return this;
  },
  
  property: function(property) {
    var name = 'transition-property';
    if (property === undefined) return this.get(name);
    this.set(name, property);
    return this;
  },
  
  style: function(style) {
    var name = 'transform-style';
    if (style === undefined) return this.get(name);
    this.set(name, style);
    return this;
  },
  
  transform: function(transform) {
    var name = 'transform';
    if (transform === undefined) return this.get(name);
    this.set(name, transform);
    return this;
  },
  
  transit: function(duration, delay, easing, callback) {
    
    this.duration(duration);
    this.delay(delay);
    this.easing(easing);
    
    // A: If transform with non transform properties, width, height and etc,
    // transitionEnd event does not fired properly. 
    // So We use setTimeout instead of transitionEnd event binding.
    /*
    // If transition-duration is set with condition of (> 0), transitionEnd will completely fired.
    In contrast,  if being set 0, the event would not be fired.
    if (this.duration() > 0) {
      $(this).bind(transitionEnd, this.complete);
    }
    */
    
    $(this.elem).css(this.styles);
    
    // Because next queue might be executed before setting style to dom,
    // we have to wait until css property is set.
    if (this.duration() === 0) {
      var i = 0, duration = vendorPropName(this.elem.style, 'transition-duration');
      while (++i > 50) {
        if (parseInt($(this.elem).css(duration), 10) === 0) break;
      }
      // comment out in relation to A.
      // setTimeout($.proxy(done, this), 0);
    }
    
    // use setTimeout as alternate of transitionEnd in relation to A.
    setTimeout($.proxy(this.complete(this, callback), this.elem), this.duration());
    
    return this;
  },
  
  complete: function(that, callback) {
    return function() {
      // comment out in relation to A.
      // $(this).unbind(transitionEnd, done);
      $.proxy(callback, this)();
      $(this).dequeue();
      if ($(this).queue().length === 0) that.clear();
    }
  },
  
  clear: function() {
    // clear transition properties
    this.duration('', '').delay('', '').easing('').property('');
    $(this.elem).css(this.styles);
  }
}

function transit(elem, options) {
  
  var transform = $(elem).data('tween:transform') || Transform.factory();
  var transition = new Transition(elem);
  
  transition.style(options.style);
  transition.transform(transform.update(options.props).toString());
  
  // add non transform properties
  // e.g. width, height, color ...
  for (var k in options.props) {
    // excluding perspective property, because this has to be set on parent. 
    if (transform[k] === undefined && k !== 'perspective') {
      transition.set(k, options.props[k]);
    }
  }
  
  // The transform-origin has to applied to element before apply any other transformation.
  // If not so, transform-origin of element would have shifted a little.
  if (options.props.origin != undefined) {
    $(elem).css(vendorPropName(elem.style, 'transform-origin'), options.props.origin);
  }
  
  // enable 3d transformation.
  // If you want to make perspective disable, set none on depth.
  if (options.props.perspective != undefined) {
    $(elem).parent().css(vendorPropName(elem.style, 'perspective'), options.props.perspective);
  }
  
  transition.transit(
    options.duration,
    options.delay,
    options.easing,
    options.complete
  );
  
  // store updated transform properties
  $(elem).data('tween:transform', transform);
}