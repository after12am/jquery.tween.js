/*
 * jquery.cssanimate
 *
 * https://github.com/after12am/cssanimate.js
 *
 * Copyright 2013 Satoshi Okami
 * Released under the MIT license
 */
(function(d){void 0==String.prototype.format&&(String.prototype.format=function(a){if("object"==typeof a)return this.replace(/\{(\w+)\}/g,function(e,c){return a[c]});a=Array.prototype.slice.apply(arguments);return ss=a.reduce(function(e,c,f){return e.replace("{i}".replace("i",f),a[f])},this.toString())});d.fn.translateX=function(a,e,c,f,b){this.cssanimate({x:a},e,c,f,b)};d.fn.translateY=function(a,e,c,f,b){this.cssanimate({y:a},e,c,f,b)};d.fn.translateZ=function(a,e,c,f,b,d){this.cssanimate({z:a,
perspective:e},c,f,b,d)};d.fn.translate=function(a,e,c,f,b,d){this.cssanimate({x:a,y:e},c,f,b,d)};d.fn.translate3d=function(a,e,c,f,b,d,i,k){this.cssanimate({x:a,y:e,z:c,perspective:f},b,d,i,k)};d.fn.scaleX=function(a,e,c,f,b){this.cssanimate({scalex:a},e,c,f,b)};d.fn.scaleY=function(a,e,c,f,b){this.cssanimate({scaley:a},e,c,f,b)};d.fn.scaleZ=function(){throw Error("not implemented");};d.fn.scale=function(a,e,c,f,b,d){this.cssanimate({scalex:a,scaley:e},c,f,b,d)};d.fn.scale3d=function(){throw Error("not implemented");
};d.fn.rotateX=function(a,e,c,f,b){this.cssanimate({rotatex:a},e,c,f,b)};d.fn.rotateY=function(a,e,c,f,b,d){this.cssanimate({rotatey:a,perspective:e},c,f,b,d)};d.fn.rotateZ=function(a,e,c,b,d){this.cssanimate({rotatez:a},e,c,b,d)};d.fn.rotate=function(a,e,c,b,d){this.cssanimate({rotate:a},e,c,b,d)};d.fn.rotate3d=function(a,e,c,b,d,h,i,k,j){this.cssanimate({rotate:[a,e,c,b],perspective:d},h,i,k,j)};d.fn.skewX=function(a,e,c,b,d){this.cssanimate({skewx:a},e,c,b,d)};d.fn.skewY=function(a,e,c,b,d){this.cssanimate({skewy:a},
e,c,b,d)};d.fn.skew=function(a,e,c,b,d,h){this.cssanimate({skew:[a,e]},c,b,d,h)};var j={prefix:function(){var a=d("<div>")[0],e="",c={WebkitTransition:"-webkit-",MozTransition:"-moz-",MSTransition:"-ms-",OTransition:"-o-",transition:""};for(e in c)if(a.style[e]!==void 0){e=c[e];break}return e},transitionEnd:function(){var a=d("<div>")[0],e="transitionEnd",c={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",MSTransition:"msTransitionEnd",OTransition:"oTransitionEnd",transition:"transitionEnd"},
b;for(b in c)if(a.style[b]!==void 0){e=c[b];break}return e}};d.fn.cssanimate=function(a,e,c,f,g){a=a||{};if(typeof e==="function"){g=e;e=void 0}if(typeof c==="function"){g=c;c=void 0}if(typeof f==="function"){g=f;f=void 0}if(e)a.duration=e;if(c)a.delay=c;if(f)a.ease=f;delete a.perspective;d(this).queue((new b).compile(a).queue(d(this),g));return this};d.fn.origin=function(a,e){var c=b.prefix,f={};f["{0}transition-duration".format(c)]="0";f["{0}transform-origin".format(c)]="{0} {1}".format(a,e);d(this).css(f);
for(f=0;;){if(d(this).css("{0}transition-duration".format(c)).match(/^0/))break;if(++f>50)break}return this};var b=function(){this.css={};this.transition={}};b.prefix=j.prefix();b.transitionEvent=j.transitionEnd();b.ease={"in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",linear:"cubic-bezier(0.250, 0.250, 0.750, 0.750)","ease-in-quad":"cubic-bezier(0.550, 0.085, 0.680, 0.530)","ease-in-cubic":"cubic-bezier(0.550, 0.055, 0.675, 0.190)","ease-in-quart":"cubic-bezier(0.895, 0.030, 0.685, 0.220)",
"ease-in-quint":"cubic-bezier(0.755, 0.050, 0.855, 0.060)","ease-in-sine":"cubic-bezier(0.470, 0.000, 0.745, 0.715)","ease-in-expo":"cubic-bezier(0.950, 0.050, 0.795, 0.035)","ease-in-circ":"cubic-bezier(0.600, 0.040, 0.980, 0.335)","ease-in-back":"cubic-bezier(0.600, -0.280, 0.735, 0.045)","ease-out-quad":"cubic-bezier(0.250, 0.460, 0.450, 0.940)","ease-out-cubic":"cubic-bezier(0.215, 0.610, 0.355, 1.000)","ease-out-quart":"cubic-bezier(0.165, 0.840, 0.440, 1.000)","ease-out-quint":"cubic-bezier(0.230, 1.000, 0.320, 1.000)",
"ease-out-sine":"cubic-bezier(0.390, 0.575, 0.565, 1.000)","ease-out-expo":"cubic-bezier(0.190, 1.000, 0.220, 1.000)","ease-out-circ":"cubic-bezier(0.075, 0.820, 0.165, 1.000)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1.275)","ease-out-quad":"cubic-bezier(0.455, 0.030, 0.515, 0.955)","ease-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1.000)","ease-in-out-quart":"cubic-bezier(0.770, 0.000, 0.175, 1.000)","ease-in-out-quint":"cubic-bezier(0.860, 0.000, 0.070, 1.000)","ease-in-out-sine":"cubic-bezier(0.445, 0.050, 0.550, 0.950)",
"ease-in-out-expo":"cubic-bezier(1.000, 0.000, 0.000, 1.000)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.150, 0.860)","ease-in-out-back":"cubic-bezier(0.680, -0.550, 0.265, 1.550)"};b.prototype.compile=function(a){var b=[],c;for(c in a){switch(c){case "x":b.push(this.parseX(a[c]));break;case "y":b.push(this.parseY(a[c]));break;case "z":b.push(this.parseZ(a[c]));break;case "rotate":b.push(this.parseRotate(a[c]));break;case "rotatex":b.push(this.parseRotateX(a[c]));break;case "rotatey":b.push(this.parseRotateY(a[c]));
break;case "rotatez":b.push(this.parseRotateZ(a[c]));break;case "scale":b.push(this.parseScale(a[c]));break;case "scalex":b.push(this.parseScaleX(a[c]));break;case "scaley":b.push(this.parseScaleY(a[c]));break;case "scalez":b.push(this.parseScaleZ(a[c]));break;case "skew":b.push(this.parseSkew(a[c]));break;case "skewx":b.push(this.parseSkewX(a[c]));break;case "skewy":b.push(this.parseSkewY(a[c]));break;default:continue}delete a[c]}a=this.build(a,b);this.css=a.css;this.transition=a.transition;this.queue();
return this};b.prototype.build=function(a,e){var c={},f=b.prefix;c["{0}transform".format(f)]=e.join(" ");c["{0}transition-property".format(f)]=this.property(a);c["{0}transition-duration".format(f)]=this.duration(a);c["{0}transition-delay".format(f)]=this.delay(a);c["{0}transition-timing-function".format(f)]=this.ease(a);c["{0}transform-style".format(f)]=this.style(a);delete a.property;delete a.duration;delete a.delay;delete a.ease;delete a.style;return{css:d.extend(c,a),transition:c}};b.prototype.queue=
function(a,e){var c=this,f=this.duration(),g=b.prefix,h=function(){d(a).unbind(b.transitionEvent,d.proxy(h,a));typeof e==="function"&&d.proxy(e,a)();d(a).dequeue()};return function(){if(f===0){d(a).css(css);for(var i=0;;){if(d(a).css("{0}transition-duration".format(g)).match(/^0/))break;if(++i>50)break}typeof e==="function"&&d.proxy(e,a)();d(a).dequeue()}else d(a).bind(b.transitionEvent,d.proxy(h,a)).css(c.css)}};b.prototype.parseX=function(a){return"translateX({0}px)".format(a||0)};b.prototype.parseY=
function(a){return"translateY({0}px)".format(a||0)};b.prototype.parseZ=function(a){return"translateZ({0}px)".format(a||0)};b.prototype.parseRotate=function(a){return a.constructor===Object?this.parseRotateObjectInitialiser(a):a.constructor===Array?this.parseRotateArrayInitialiser(a):"rotate({0}deg)".format(a||0)};b.prototype.parseRotateObjectInitialiser=function(a){return[this.parseRotateX(a.x),this.parseRotateY(a.y),this.parseRotateZ(a.z)].join(" ")};b.prototype.parseRotateArrayInitialiser=function(a){return"rotate3d({0},{1},{2},{3}deg)".format(a[0]||
0,a[1]||0,a[2]||0,a[3]||0)};b.prototype.parseRotateX=function(a){return"rotateX({0}deg)".format(a||0)};b.prototype.parseRotateY=function(a){return"rotateY({0}deg)".format(a||0)};b.prototype.parseRotateZ=function(a){return"rotateZ({0}deg)".format(a||0)};b.prototype.parseScale=function(a){return a.constructor===Object?this.parseScaleObjectInitialiser(a):a.constructor===Array?this.parseScaleArrayInitialiser(a):"scale({0},{1})".format(a||0,a||0)};b.prototype.parseScaleObjectInitialiser=function(a){return"scale3d({0},{1},{2})".format(a.x||
0,a.y||0,a.z||0)};b.prototype.parseScaleArrayInitialiser=function(a){return"scale3d({0},{1},{2})".format(a[0]||0,a[1]||0,a[2]||0)};b.prototype.parseScaleX=function(a){return"scaleX({0})".format(a||0)};b.prototype.parseScaleY=function(a){return"scaleY({0})".format(a||0)};b.prototype.parseScaleZ=function(a){return"scaleZ({0})".format(a||0)};b.prototype.parseSkew=function(a){return a.constructor===Object?this.parseSkewObjectInitialiser(a):a.constructor===Array?this.parseSkewArrayInitialiser(a):[this.parseSkewX(a),
this.parseSkewY(a)].join(" ")};b.prototype.parseSkewObjectInitialiser=function(a){return[this.parseSkewX(a.x),this.parseSkewY(a.y)].join(" ")};b.prototype.parseSkewArrayInitialiser=function(a){return[this.parseSkewX(a[0]),this.parseSkewY(a[1])].join(" ")};b.prototype.parseSkewX=function(a){return"skewX({0}deg)".format(a||0)};b.prototype.parseSkewY=function(a){return"skewY({0}deg)".format(a||0)};b.prototype.property=function(a){a=a.property||"all";return a.constructor===Array?a.join(","):a};b.prototype.duration=
function(a){return!a?this.transition["{0}transition-duration".format(b.prefix)].replace("ms",""):"{0}ms".format(a.duration||400)};b.prototype.delay=function(a){return a.delay||0};b.prototype.ease=function(a){return a.ease?b.ease[a.ease]:"ease-in-out"};b.prototype.style=function(a){return["flat","preserve-3d"].indexOf(a.style)>=0?a.style:"flat"}})(jQuery);
