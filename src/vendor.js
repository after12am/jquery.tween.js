var cssPrefixes = ["Webkit", "O", "Moz", "ms"];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName(style, name) {
  
  // shortcut for names that are not vendor prefixed
  if (name in style) {
    return name;
  }
  
  // check for vendor prefixed names
  var capName = name.charAt(0).toUpperCase() + name.slice(1),
    origName = name,
    i = cssPrefixes.length;
  
  while (i--) {
    name = cssPrefixes[i] + capName;
    if (name in style) {
      return name;
    }
  }
  
  return origName;
}

var vendorPrefix = (function () {
  if (!window.getComputedStyle) return;
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype
    .slice
    .call(styles)
    .join('')
    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
  )[1];
  return pre;
})();

var transitionEnd = (function() {
  
  var e = $('<div>')[0];
  
  // firefox supports from v4.0
  // https://developer.mozilla.org/en-US/docs/Web/Reference/Events/transitionend
  var transitions = {
    'webkit': 'webkitTransitionEnd',
    'moz': 'transitionend',
    'ms': 'msTransitionEnd',
    'o': 'webkitTransitionEnd'// opera is fork of webkit now
  };
  
  for (var t in transitions) {
    if (vendorPrefix === t) {
      return transitions[t];
    }
  }
  
  if ('transitionend' in e.style) return 'transitionend';
  return;
})();

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