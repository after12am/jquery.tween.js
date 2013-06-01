/*
 * jquery.cssanimate.js
 *
 * A jQuery plugin provides a stylish and cute animation for your smartphone app.
 *
 * https://github.com/after12am/jquery.cssanimate.js
 *
 * Copyright 2012-2013 Satoshi Okami
 * Released under the MIT license
 */
(function(e){function d(a){return{format:function(b){if("object"==typeof b)return a.replace(/\{(\w+)\}/g,function(a,c){return b[c]});b=Array.prototype.slice.apply(arguments);return ss=b.reduce(function(a,c,e){return a.replace("{i}".replace("i",e),b[e])},a.toString())}}}e.fn.origin=function(a,b){e(this).queue(function(){e(this).css(f.css.property("origin"),d("{0} {1}").format(a,b));for(var c=0;!e(this).css(f.css.property("origin"))&&!(50<++c););e(this).dequeue()});return this};e.fn.perspective=function(a){e(this).queue(function(){e(this).parent().css(f.css.property("perspective"),
d("{0}px").format(+a||0));for(var b=0;!e(this).parent().css(f.css.property("perspective"))&&!(50<++b););e(this).dequeue()});return this};e.fn.to=function(a,b,c,e,d){return a.constructor!==Array?this:this.cssanimate({to:a},b,c,e,d)};e.fn.rotate=function(a,b,c,e,d){return a.constructor!==Array?this:this.cssanimate({rotate:a},b,c,e,d)};e.fn.scale=function(a,b,c,e,d){return a.constructor!==Array?this:this.cssanimate({scale:a},b,c,e,d)};e.fn.skew=function(a,b,c,e,d){return a.constructor!==Array?this:this.cssanimate({skew:a},
b,c,e,d)};var f={prefix:function(){var a=e("<div>")[0],b="",c={WebkitTransition:"-webkit-",MozTransition:"-moz-",MSTransition:"-ms-",OTransition:"-o-",transition:""};for(b in c)if(void 0!==a.style[b])return c[b];return b},event:{}};f.event.transitionEnd=function(){var a=e("<div>")[0],b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",MSTransition:"msTransitionEnd",OTransition:"oTransitionEnd",transition:"transitionEnd"},c;for(c in b)if(void 0!==a.style[c])return b[c];return"transitionEnd"};
f.css={};f.css.property=function(a){var b=c.prefix;return{transform:d("{0}transform").format(b),origin:d("{0}transform-origin").format(b),duration:d("{0}transition-duration").format(b),property:d("{0}transition-property").format(b),delay:d("{0}transition-delay").format(b),ease:d("{0}transition-timing-function").format(b),style:d("{0}transition-style").format(b),perspective:d("{0}perspective").format(b)}[a]||a};e.fn.cssanimate=function(a,b,d,f,g){var h,a=a||{};"function"===typeof b&&(g=b,b=void 0);
"function"===typeof d&&(g=d,d=void 0);"function"===typeof f&&(g=f,f=void 0);void 0!==a.duration&&(b=a.duration,delete a.duration);void 0!==a.delay&&(d=a.delay,delete a.delay);void 0!==a.ease&&(f=a.ease,delete a.ease);void 0!==a.property&&(h=a.property.constructor===Array?a.property.join(","):a.property,delete a.property);"property duration delay ease style origin perspective".split(" ").forEach(function(b){delete a[b]});(new c(e(this),b,d,f,void 0,h)).compile(a).queue(g);return this};var c=function(a,
b,d,e,f,h){this.css={};this.elem=a;this.transition={transform:[],duration:"number"===typeof b?b:400,delay:d||0,ease:c.ease[e]||e||"ease-in-out",style:f||"flat",property:h||"all"}};c.prefix=f.prefix();c.transitionEvent=f.event.transitionEnd();c.ease={"in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",linear:"cubic-bezier(0.250, 0.250, 0.750, 0.750)","ease-in-quad":"cubic-bezier(0.550, 0.085, 0.680, 0.530)","ease-in-cubic":"cubic-bezier(0.550, 0.055, 0.675, 0.190)","ease-in-quart":"cubic-bezier(0.895, 0.030, 0.685, 0.220)",
"ease-in-quint":"cubic-bezier(0.755, 0.050, 0.855, 0.060)","ease-in-sine":"cubic-bezier(0.470, 0.000, 0.745, 0.715)","ease-in-expo":"cubic-bezier(0.950, 0.050, 0.795, 0.035)","ease-in-circ":"cubic-bezier(0.600, 0.040, 0.980, 0.335)","ease-in-back":"cubic-bezier(0.600, -0.280, 0.735, 0.045)","ease-out-quad":"cubic-bezier(0.250, 0.460, 0.450, 0.940)","ease-out-cubic":"cubic-bezier(0.215, 0.610, 0.355, 1.000)","ease-out-quart":"cubic-bezier(0.165, 0.840, 0.440, 1.000)","ease-out-quint":"cubic-bezier(0.230, 1.000, 0.320, 1.000)",
"ease-out-sine":"cubic-bezier(0.390, 0.575, 0.565, 1.000)","ease-out-expo":"cubic-bezier(0.190, 1.000, 0.220, 1.000)","ease-out-circ":"cubic-bezier(0.075, 0.820, 0.165, 1.000)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1.275)","ease-out-quad":"cubic-bezier(0.455, 0.030, 0.515, 0.955)","ease-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1.000)","ease-in-out-quart":"cubic-bezier(0.770, 0.000, 0.175, 1.000)","ease-in-out-quint":"cubic-bezier(0.860, 0.000, 0.070, 1.000)","ease-in-out-sine":"cubic-bezier(0.445, 0.050, 0.550, 0.950)",
"ease-in-out-expo":"cubic-bezier(1.000, 0.000, 0.000, 1.000)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.150, 0.860)","ease-in-out-back":"cubic-bezier(0.680, -0.550, 0.265, 1.550)"};c.prototype.compile=function(a){for(var b in a){switch(b){case "to":this.transition.transform.push(this.parseTranslate(a[b]));break;case "x":this.transition.transform.push(this.parseX(a[b]));break;case "y":this.transition.transform.push(this.parseY(a[b]));break;case "z":this.transition.transform.push(this.parseZ(a[b]));
break;case "rotate":this.transition.transform.push(this.parseRotate(a[b]));break;case "rotatex":this.transition.transform.push(this.parseRotateX(a[b]));break;case "rotatey":this.transition.transform.push(this.parseRotateY(a[b]));break;case "rotatez":this.transition.transform.push(this.parseRotateZ(a[b]));break;case "scale":this.transition.transform.push(this.parseScale(a[b]));break;case "scalex":this.transition.transform.push(this.parseScaleX(a[b]));break;case "scaley":this.transition.transform.push(this.parseScaleY(a[b]));
break;case "scalez":this.transition.transform.push(this.parseScaleZ(a[b]));break;case "skew":this.transition.transform.push(this.parseSkew(a[b]));break;case "skewx":this.transition.transform.push(this.parseSkewX(a[b]));break;case "skewy":this.transition.transform.push(this.parseSkewY(a[b]));break;default:continue}delete a[b]}this.css=e.extend(property=a,this.build());return this};c.prototype.build=function(){var a={};a[f.css.property("transform")]=this.transition.transform.join(" ");a[f.css.property("property")]=
this.transition.property;a[f.css.property("duration")]=d("{0}ms").format(this.transition.duration);a[f.css.property("delay")]=this.transition.delay;a[f.css.property("ease")]=this.transition.ease;a[f.css.property("style")]=this.transition.style;return a};c.prototype.queue=function(a){var b=this;e(this.elem).queue(function(){var d=function(){e(this).unbind(c.transitionEvent,e.proxy(d,this));"function"===typeof a&&e.proxy(a,this)();e(this).dequeue()};if(0===b.transition.duration){e(b.elem).css(b.css);
for(var i=0;!e(b.elem).css(f.css.property("duration")).match(/^0/)&&!(50<++i););"function"===typeof a&&e.proxy(a,b.elem)();e(b.elem).dequeue()}else e(b.elem).bind(c.transitionEvent,e.proxy(d,b.elem)).css(b.css)})};c.prototype.parseTranslate=function(a){return a.constructor===Object?this.parseTranslateObjectInitialiser(a):a.constructor===Array?this.parseTranslateArrayInitialiser(a):d("translate({0}px, {1}px)").format(a,a)};c.prototype.parseTranslateObjectInitialiser=function(a){return[this.parseX(a.x),
this.parseY(a.y),this.parseZ(a.z)].join(" ")};c.prototype.parseTranslateArrayInitialiser=function(a){if(2===a.length||3===a.length)return[this.parseX(a[0]),this.parseY(a[1]),this.parseZ(a[2])].join(" ");if(4===a.length)return d("translate3d({0},{1},{2},{3}deg)").format(a[0]||0,a[1]||0,a[2]||0,a[3]||0)};c.prototype.parseX=function(a){return d("translateX({0}px)").format(a||0)};c.prototype.parseY=function(a){return d("translateY({0}px)").format(a||0)};c.prototype.parseZ=function(a){return d("translateZ({0}px)").format(a||
0)};c.prototype.parseRotate=function(a){return a.constructor===Object?this.parseRotateObjectInitialiser(a):a.constructor===Array?this.parseRotateArrayInitialiser(a):d("rotate({0}deg)").format(a||0)};c.prototype.parseRotateObjectInitialiser=function(a){return[this.parseRotateX(a.x),this.parseRotateY(a.y),this.parseRotateZ(a.z)].join(" ")};c.prototype.parseRotateArrayInitialiser=function(a){if(2===a.length||3===a.length)return[this.parseRotateX(a[0]),this.parseRotateY(a[1]),this.parseRotateZ(a[2])].join(" ");
if(4===a.length)return d("rotate3d({0},{1},{2},{3}deg)").format(a[0]||0,a[1]||0,a[2]||0,a[3]||0)};c.prototype.parseRotateX=function(a){return d("rotateX({0}deg)").format(a||0)};c.prototype.parseRotateY=function(a){return d("rotateY({0}deg)").format(a||0)};c.prototype.parseRotateZ=function(a){return d("rotateZ({0}deg)").format(a||0)};c.prototype.parseScale=function(a){return a.constructor===Object?this.parseScaleObjectInitialiser(a):a.constructor===Array?this.parseScaleArrayInitialiser(a):d("scale({0},{1})").format(a||
0,a||0)};c.prototype.parseScaleObjectInitialiser=function(a){return d("scale3d({0},{1},{2})").format(a.x||0,a.y||0,a.z||0)};c.prototype.parseScaleArrayInitialiser=function(a){return 2===a.length?[this.parseScaleX(a[0]),this.parseScaleY(a[1])].join(" "):d("scale3d({0},{1},{2})").format(a[0]||0,a[1]||0,a[2]||0)};c.prototype.parseScaleX=function(a){return d("scaleX({0})").format(a||0)};c.prototype.parseScaleY=function(a){return d("scaleY({0})").format(a||0)};c.prototype.parseScaleZ=function(a){return d("scaleZ({0})").format(a||
0)};c.prototype.parseSkew=function(a){return a.constructor===Object?this.parseSkewObjectInitialiser(a):a.constructor===Array?this.parseSkewArrayInitialiser(a):[this.parseSkewX(a),this.parseSkewY(a)].join(" ")};c.prototype.parseSkewObjectInitialiser=function(a){return[this.parseSkewX(a.x),this.parseSkewY(a.y)].join(" ")};c.prototype.parseSkewArrayInitialiser=function(a){return[this.parseSkewX(a[0]),this.parseSkewY(a[1])].join(" ")};c.prototype.parseSkewX=function(a){return d("skewX({0}deg)").format(a||
0)};c.prototype.parseSkewY=function(a){return d("skewY({0}deg)").format(a||0)}})(jQuery);
