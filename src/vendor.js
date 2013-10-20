// return a css property mapped to a potentially vendor prefixed property
var vendorPropName = function(style, name) {
  
  var cssPrefixes = ["Webkit", "O", "Moz", "ms"];
  
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

var isIE = (function() {
  //return !!window.navigator.userAgent.toLowerCase().match(/msie\s([6-9]{1})/);
  return !!window.navigator.userAgent.toLowerCase().match(/msie/);
})();