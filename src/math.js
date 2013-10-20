var degToRad = function() {

  var degreeToRadiansFactor = Math.PI / 180;

  return function ( degrees ) {
    return degrees * degreeToRadiansFactor;
  };
}();

var radToDeg = function() {

  var radianToDegreesFactor = 180 / Math.PI;

  return function ( radians ) {
    return radians * radianToDegreesFactor;
  };
}();

var round = function() {
  
  var pow = Math.pow(10, 3);
  
  return function(value) {
    return Math.round(value * pow) / pow
  }
}();

var isRel = function(v) {
  return (typeof v === 'string' && v.match(/^\s*(\+|-)=\s*([0-9]+)\s*$/));
}