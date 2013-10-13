function transit(options) {
  return function() {
    
    var cubicBezier = {
      'in'                : 'ease-in',
      'out'               : 'ease-out',
      'in-out'            : 'ease-in-out',
      'snap'              : 'cubic-bezier(0,1,0.5,1)',
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
    };
    
    function complete() {
      // comment out in relation to A.
      // $(this).unbind(transitionEnd, done);
      $.proxy(options.complete, this)();
      $(this).dequeue();
      if ($(this).queue().length === 0) clearTransitions(this);
    }
    
    function clearTransitions(elem) {
      var updates = {}, clearTransitions = [
        'transition-duration', 
        'transition-delay', 
        'transition-timing-function', 
        'transition-property'
      ];
      for (var k = 0; k < clearTransitions.length; k++) updates[vendorPropName(elem.style, clearTransitions[k])] = '';
      $(elem).css(updates);
    }
    
    // if (options.props.origin) {
    //   $(this).css(vendorPropName(this.style, 'transform-origin'), options.props.origin);
    // }
    
    var transform;
    if (!(transform = $(this).data('tween:transform'))) {
      switch (vendorPrefix) {
        case 'o': transform = new OTransform(); break;
        default: transform = new Transform(); break;
      }
    }
    
    transform.update(options.props);
    
    var updates = {
      'transition-duration': str('{0}ms').format(options.duration),
      'transition-delay': str('{0}ms').format(options.delay),
      'transition-timing-function': cubicBezier[options.easing],
      'transition-property': options.property,
      'transform-style': options.style,
      'transform': transform.toString()
    };
    
    // giving vendor prefix
    for (var k in updates) {
      updates[vendorPropName(this.style, k)] = updates[k];
    }

    // add non transform properties
    // i.e. width, height, color ...
    for (var k in options.props) {
      if (!transform[k]) updates[k] = options.props[k];
    }
    
    $(this).data('tween:transform', transform);
    
    // A: If transform with non transform properties, width, height and etc,
    // transitionEnd event does not fired properly. 
    // So We use setTimeout instead of transitionEnd event binding.
    /*
    // If transition-duration is set with condition of (> 0), transitionEnd will completely fired.
    // In contrast,  if being set 0, the event would not be fired.
    // if (options.duration > 0) {
    //   $(this).bind(transitionEnd, done);
    // }
    */
    
    // apply transition
    $(this).css(updates);
    
    // Because next queue might be executed before setting style to dom,
    // we have to wait until css property is set.
    if (options.duration === 0) {
      var i = 0, duration = vendorPropName(this.style, 'transition-duration');
      while (++i > 50) {
        if ($(this).css(duration).match(/^0/)) break;
      }
      // comment out in relation to A.
      // setTimeout($.proxy(done, this), 0);
    }
    
    // use setTimeout as alternate of transitionEnd in relation to A.
    setTimeout($.proxy(complete, this), options.duration);
  }
}