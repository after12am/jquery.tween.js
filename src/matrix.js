/**
 * Matrix, actually a 3x3 one, but the bottom line would always say 0 0 1, which would cause lots of senseless 0's to be calculated everywhere.
 *
 */
var Matrix = function(base) {
  this.base = base || [1, 0, 0, 0, 1, 0];
};

Matrix.prototype = {
  _multiply: function(
    a1,a2,a3,a4,a5,a6, 
    b1,b2,b3,b4,b5,b6
  ) {
    return new Matrix([
      a1 * b1 + a2 * b4,
      a1 * b2 + a2 * b5,
      a1 * b3 + a2 * b6 + a3, // because of the 0 0 1
      a4 * b1 + a5 * b4,
      a4 * b2 + a5 * b5,
      a4 * b3 + a5 * b6 + a6 // and again
    ]);
  },

  multiply:function(b) {
    // apply the concatenated arrays to get 12 arguments, is actually faster.
    return this._multiply.apply(this, this.base.concat(b));
  },

  translate:function(v) {
    return this.multiply([1, 0, v.x, 0, 1, v.y]);
  },

  rotate:function(r) {
    var sin = Math.sin(r);
    var cos = Math.cos(r);
    return this.multiply([cos, sin, 0, -sin, cos, 0]);
  },

  scale:function(v) {
    return this.multiply([v.x, 0, 0, 0, v.y, 0]);
  },

  skew: function(v) {
    return this.multiply([1, v.y || 0, 0, v.x || 0, 1, 0]);
  },

  // CSS puts the translation elsewhere, really a 2x2 matrix with added dx and dy instead of a 3x3
  toArray: function() {
    var b = this.base;
    return [b[0], b[1], b[3], b[4], b[2], b[5]];
  }
};

Matrix.parseArray = function(b) {
  // 2x2 vs 3x3
  return new Matrix([
    b[0], b[1], b[4],
    b[2], b[3], b[5]
  ]);
};