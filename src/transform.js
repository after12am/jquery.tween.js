var Transform = function() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.rotatex = 0;
  this.rotatey = 0;
  this.rotatez = 0;
  this.scalex = 1;
  this.scaley = 1;
  this.scalez = 1;
  this.skewx = 0;
  this.skewy = 0;
  this.origin = '50% 50%';
  this.perspective = 'none';
}

Transform.factory = function() {
  switch (vendorPrefix) {
    case 'o': return new OTransform();
    default: return new Transform();
  }
}

// make relative value to absolute
Transform.prototype.toAbs = function(k, v) {
  var m;
  if (typeof v === 'string' && (m = v.match(/^\s*(\+|-)=\s*([0-9]+)\s*$/))) {
    switch (m[1]) {
      case '+': v = this[k] + (+m[2]); break;
      case '-': v = this[k] - (+m[2]); break;
    }
  }
  return +v;
}

Transform.prototype.set = function(k, v) {
  this[k] = v;
  return this;
}

Transform.prototype.update = function(props) {
  for (var k in props) {
    if (this[k] !== undefined && typeof this[k] !== 'function') {
      this.set(k, this.toAbs(k, props[k]));
    }
  }
  return this;
}

Transform.prototype.translate = function() {
  return sprintf('translate(%spx,%spx)', 
    this.x,
    this.y
  );
}

Transform.prototype.translateX = function() {
  return sprintf('translateX(%spx)',
    this.x
  );
}

Transform.prototype.translateY = function() {
  return sprintf('translateY(%spx)',
    this.y
  );
}

Transform.prototype.translateZ = function() {
  return sprintf('translateZ(%spx)',
    this.z
  );
}

Transform.prototype.translate3d = function() {
  return sprintf('translate3d(%spx,%spx,%spx)',
    this.x,
    this.y,
    this.z
  );
}

Transform.prototype.rotateX = function() {
  return sprintf('rotateX(%sdeg)',
    this.rotatex
  );
}

Transform.prototype.rotateY = function() {
  return sprintf('rotateY(%sdeg)',
    this.rotatey
  );
}

Transform.prototype.rotateZ = function() {
  return sprintf('rotateZ(%sdeg)',
    this.rotatez
  );
}

Transform.prototype.scale = function() {
  return sprintf('scale(%s,%s)',
    this.scalex,
    this.scaley
  );
}

Transform.prototype.scaleX = function() {
  return sprintf('scaleX(%s)',
    this.scalex
  );
}

Transform.prototype.scaleY = function() {
  return sprintf('scaleY(%s)',
    this.scaley
  );
}

Transform.prototype.scaleZ = function() {
  return sprintf('scaleZ(%s)',
    this.scalez
  );
}

Transform.prototype.scale3d = function() {
  return sprintf('scale3d(%s,%s,%s)',
    this.scalex,
    this.scaley,
    this.scalez
  );
}

Transform.prototype.skew = function() {
  return sprintf('skew({x}deg,{y}deg)',
    this.skewx,
    this.skewy
  );
}

Transform.prototype.skewX = function() {
  return sprintf('skewX(%sdeg)',
    this.skewx
  );
}

Transform.prototype.skewY = function() {
  return sprintf('skewY(%sdeg)',
    this.skewy
  );
}

Transform.prototype.toString = function() {
  return [
    this.translate3d(),
    this.rotateX(),
    this.rotateY(),
    this.rotateZ(),
    this.scale(),
    // skew is something wrong. Use skewX and skewY as alternate.
    this.skewX(),
    this.skewY()
  ].join(' ');
}

var OTransform = function() {
  Transform.call(this);
}

OTransform.prototype = Object.create(Transform.prototype);
OTransform.prototype.toString = function() {
  // opera does support only 2d transformation.
  return [
    this.translate(),
    this.rotateZ(),
    this.scale(),
    // skew is something wrong. Use skewX and skewY as alternate.
    this.skewX(),
    this.skewY()
  ].join(' ');
}