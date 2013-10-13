var DxImageMatrix = function() {
  this.start = [1.0, 0.0, 0.0, 1.0]; // [M11, M12, M21, M22]
  this.end = [1.0, 0.0, 0.0, 1.0];
  this.rotation = 0;
  this.filterType = 'bilinear';
  this.sizingMethod = 'auto expand';
}


DxImageMatrix.prototype.rotateZ = function(v) {
  var deg = degToRad(v);
  this.end = [
     Math.cos(deg),
    -Math.sin(deg),
     Math.sin(deg),
     Math.cos(deg)
  ];
  return this;
}

DxImageMatrix.prototype.toString = function() {
  return sprintf("DXImageTransform.Microsoft.Matrix(M11=%s,M12=%s,M21=%s,M22=%s,FilterType='%s',SizingMethod='%s')",
    this.end[0],
    this.end[1],
    this.end[2],
    this.end[3],
    this.filterType,
    this.sizingMethod
  );
}

/*
DxImageMatrix.prototype.scale = function(v) {
  this.matrix[0] = v;
  this.matrix[3] = v;
}

DxImageMatrix.prototype.scaleX = function(v) {
  this.matrix[0] = v;
}

DxImageMatrix.prototype.scaleY = function(v) {
  this.matrix[3] = v;
}

DxImageMatrix.prototype.skew = function(v) {
  this.matrix[1] = radToDeg(v);
  this.matrix[2] = radToDeg(v);
}

DxImageMatrix.prototype.skewX = function(v) {
  this.matrix[1] = radToDeg(v);
}

DxImageMatrix.prototype.skewY = function(v) {
  this.matrix[2] = radToDeg(v);
}
*/





/*
var DxImageRotation = function() {
  this.start = { rotatez: 0 };
  this.end = { rotatez: 0 };
  this.curr = { rotatez: 0 };
}


DxImageRotation.prototype.rotateZ = function(value) {
  this.curr.rotatez = value;
  return this;
}

DxImageRotation.prototype.toString = function() {
  return "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + this.curr.rotatez / 90 + ")";
}
*/