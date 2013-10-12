var Transform = function() {
  this.properties = ['x', 'y', 'z', 'rotatex', 'rotatey', 'rotatez', 'scalex', 'scaley', 'scalez', 'skewx', 'skewy'];
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
    if ($.inArray(k, this.properties) !== -1) {
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
  return str('translate({0}px)').format(
    this.x
  );
}

Transform.prototype.translateY = function() {
  return str('translate({0}px)').format(
    this.y
  );
}

Transform.prototype.translateZ = function() {
  return str('translate({0}px)').format(
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

Transform.prototype.rotate = function() {
  return str('rotate({0}deg)').format(
    this.rotatez
  );
}

Transform.prototype.rotateX = function() {
  return str('rotate({0}deg)').format(
    this.rotatex
  );
}

Transform.prototype.rotateY = function() {
  return str('rotate({0}deg)').format(
    this.rotatey
  );
}

Transform.prototype.rotateZ = function() {
  return str('rotate({0}deg)').format(
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
  return str('scale({0})').format(
    this.scalex
  );
}

Transform.prototype.scaleY = function() {
  return str('scale({0})').format(
    this.scaley
  );
}

Transform.prototype.scaleZ = function() {
  return str('scale({0})').format(
    this.scalez
  );
}

Transform.prototype.scale3d = function() {
  return str('scale({0},{1},{2})').format(
    this.scalex,
    this.scaley,
    this.scalez
  );
}

Transform.prototype.skew = function() {
  if (console && console.warn) console.warn('jquery.tween.js: Transform.skew() is something wrong. use Transform.skewX() and Transform.skewY() as alternate.');
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
  return str('skewX({0}deg)').format(
    this.skewy
  );
}

Transform.prototype.toString = function() {
  var transform = [];
  
  // opera does support only 2d transformation.
  if (vendorPrefix === 'o') {
    transform.push(this.translate());
    transform.push(this.rotate());
  } else {
    transform.push(this.translate3d());
    transform.push(this.rotateX());
    transform.push(this.rotateY());
    transform.push(this.rotateZ());
  }
  
  transform.push(this.scale());
  transform.push(this.skewX());
  transform.push(this.skewY());
  return transform.join(' ');
}