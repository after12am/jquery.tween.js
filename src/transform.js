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
    if (this[k] !== undefined) {
      this.set(k, this.toAbs(k, props[k]));
    }
  }
  return this;
}

Transform.prototype.translate = function() {
  return str('translate({0}px,{1}px)').format(
    this.x,
    this.y
  );
}

Transform.prototype.translateX = function() {
  return str('translateX({0}px)').format(
    this.x
  );
}

Transform.prototype.translateY = function() {
  return str('translateY({0}px)').format(
    this.y
  );
}

Transform.prototype.translateZ = function() {
  return str('translateZ({0}px)').format(
    this.z
  );
}

Transform.prototype.translate3d = function() {
  return str('translate3d({0}px,{1}px,{2}px)').format(
    this.x,
    this.y,
    this.z
  );
}

Transform.prototype.rotateX = function() {
  return str('rotateX({0}deg)').format(
    this.rotatex
  );
}

Transform.prototype.rotateY = function() {
  return str('rotateY({0}deg)').format(
    this.rotatey
  );
}

Transform.prototype.rotateZ = function() {
  return str('rotateZ({0}deg)').format(
    this.rotatez
  );
}

Transform.prototype.scale = function() {
  return str('scale({0},{1})').format(
    this.scalex,
    this.scaley
  );
}

Transform.prototype.scaleX = function() {
  return str('scaleX({0})').format(
    this.scalex
  );
}

Transform.prototype.scaleY = function() {
  return str('scaleY({0})').format(
    this.scaley
  );
}

Transform.prototype.scaleZ = function() {
  return str('scaleZ({0})').format(
    this.scalez
  );
}

Transform.prototype.scale3d = function() {
  return str('scale3d({0},{1},{2})').format(
    this.scalex,
    this.scaley,
    this.scalez
  );
}

Transform.prototype.skew = function() {
  return str('skew({x}deg,{y}deg)').format(
    this.skewx,
    this.skewy
  );
}

Transform.prototype.skewX = function() {
  return str('skewX({0}deg)').format(
    this.skewx
  );
}

Transform.prototype.skewY = function() {
  return str('skewY({0}deg)').format(
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