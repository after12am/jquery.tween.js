var Style = function(elem) {
  this.elem = elem;
  this.executable = {};
  this.position = new Vec3();
  this.rotation = new Vec3();
  this.scale = new Vec3(1, 1, 1);
  this.skew = new Vec2();
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
  var _ = $.extend(true, {}, params);
  // parse cssanimate properties and take over the values
  this.parse(_);
  // deep copy for avoiding to overwrite by the time lag
  this.executable = $.extend(true, {}, this.build(transition, _));
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
  for (var name in params) {
    // if relative value, convert to absolute value
    params[name] = this.solveRelativeValue(name, params[name]);
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

// whether argument matches relative value
Style.prototype.matchRelativeValue = function(value) {
  return value.match(/^\s*(\+=|-=)([0-9]+)\s*$/);
}

// evaluate simple expression tree
Style.prototype.evaluate = function(left, op, right) {
  switch (op) {
    case '+=': return left + right;
    case '-=': return left - right;
  }
}

// convert relative value to absolute value
Style.prototype.solveRelativeValue = function(key, value) {
  if (value.constructor === String) return this.solveRelativeValueStringInitializer(key, value);
  if (value.constructor === Object) return this.solveRelativeValueObjectInitializer(key, value);
  if (value.constructor === Array) return this.solveRelativeValueArrayInitializer(key, value);
  return value;
}

Style.prototype.solveRelativeValueStringInitializer = function(key, value) {
  var m = this.matchRelativeValue(value);
  if (m) {
    switch (key) {
      case 'to': return this.evaluate(this.position.x, m[1], +m[2]);
      case 'x': return this.evaluate(this.position.x, m[1], +m[2]);
      case 'y': return this.evaluate(this.position.y, m[1], +m[2]);
      case 'z': return this.evaluate(this.position.z, m[1], +m[2]);
      case 'rotate': return this.evaluate(this.rotation.z, m[1], +m[2]);
      case 'rotatex': return this.evaluate(this.rotation.x, m[1], +m[2]);
      case 'rotatey': return this.evaluate(this.rotation.y, m[1], +m[2]);
      case 'rotatez': return this.evaluate(this.rotation.z, m[1], +m[2]);
      case 'scale': return [this.evaluate(this.scale.x, m[1], +m[2]), this.evaluate(this.scale.y, m[1], +m[2])];
      case 'scalex': return this.evaluate(this.scale.x, m[1], +m[2]);
      case 'scaley': return this.evaluate(this.scale.y, m[1], +m[2]);
      case 'scalez': return this.evaluate(this.scale.z, m[1], +m[2]);
      case 'skew': return [this.evaluate(this.skew.x, m[1], +m[2]), this.evaluate(this.skew.y, m[1], +m[2])];
      case 'skewx': return this.evaluate(this.skew.x, m[1], +m[2]);
      case 'skewy': return this.evaluate(this.skew.y, m[1], +m[2]);
    }
  }
  return value;
}

Style.prototype.solveRelativeValueArrayInitializer = function(key, value) {
  var v, m;
  switch (key) {
    case 'to': v = this.position; break;
    case 'rotate': v = this.rotation; break;
    case 'scale': v = this.scale; break;
    case 'skew': v = this.skew; break;
  }
  if (v) {
    if (value[0] !== undefined) {
      if (value[0].constructor === String) {
        if (m = this.matchRelativeValue(value[0])) {
          value[0] = this.evaluate(v.x, m[1], +m[2]);
        }
      }
    }
    if (value[1] !== undefined) {
      if (value[1].constructor === String) {
        if (m = this.matchRelativeValue(value[1])) {
          value[1] = this.evaluate(v.y, m[1], +m[2]);
        }
      }
    }
    if (value[2] !== undefined) {
      if (value[2].constructor === String) {
        if (m = this.matchRelativeValue(value[2])) {
          value[2] = this.evaluate(v.z, m[1], +m[2]);
        }
      }
    }
  }
  return value;
}

Style.prototype.solveRelativeValueObjectInitializer = function(key, value) {
  return this.solveRelativeValueArrayInitializer(key, [value.x, value.y, value.z]);
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
  var style = {};
  style[Style.property('transition-property')] = transition.property;
  style[Style.property('transition-duration')] = str('{0}ms').format(transition.duration);
  style[Style.property('transition-delay')] = str('{0}ms').format(transition.delay);
  style[Style.property('transition-timing-function')] = transition.ease;
  style[Style.property('transform-style')] = transition.style;
  style[Style.property('transform')] = [this.buildTranslate(), this.buildRotate(), this.buildScale(), this.buildSkew()].join(' ');
  // prefix free helps you from vendor prefix hell
  // have to attach prefixed and non prefixed property. try transform property like this.
  // $box.cssanimate({ transform: 'translateX(32px)' });
  for (var name in params) {
    style[Style.property(name)] = params[name];
    style[name] = params[name];
  }
  return style;
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