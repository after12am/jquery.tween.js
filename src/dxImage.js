var DxImage = function() {
  this.curr = [1.0, 0.0, 0.0, 1.0]; // [M11, M12, M21, M22]
  this.rotation = 0;
  this.scalex = 1.0;
  this.scaley = 1.0;
  this.skewx = 0;
  this.skewy = 0;
  this.width;
  this.height;
  this.filterType = 'bilinear';
  this.sizingMethod = 'auto expand';
}

DxImage.prototype.size = function(width, height) {
  this.width = width;
  this.height = height;
  return this;
}

DxImage.prototype.rotateZ = function(v) {
  var deg = degToRad(v);
  this.curr = [
     Math.cos(deg),
    -Math.sin(deg),
     Math.sin(deg),
     Math.cos(deg)
  ];
  return this;
}

DxImage.prototype.scaleX = function(v) {
  this.curr[0] = v + this.scalex;
  return this;
}

DxImage.prototype.scaleY = function(v) {
  this.curr[3] = v + this.scaley;
  return this;
}

DxImage.prototype.skewX = function(v) {
  this.curr[1] = Math.tan(degToRad(v));
  return this;
}

DxImage.prototype.skewY = function(v) {
  this.curr[2] = Math.tan(degToRad(v));
  return this;
}

DxImage.prototype.toString = function() {
  return sprintf("DXImageTransform.Microsoft.Matrix(M11=%s,M12=%s,M21=%s,M22=%s,FilterType='%s',SizingMethod='%s')",
    this.curr[0],
    this.curr[1],
    this.curr[2],
    this.curr[3],
    this.filterType,
    this.sizingMethod
  );
}