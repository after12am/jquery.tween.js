// IE6-8 does not support Object.create
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/create
if (!Object.create) {
  Object.create = function (o) {
    if (arguments.length > 1) {
      throw new Error('Object.create implementation only accepts the first parameter.');
    }
    function F() {}
    F.prototype = o;
    return new F();
  };
}