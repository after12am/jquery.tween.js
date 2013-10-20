/*
 * jquery.tween.js v0.1.0
 * 
 * A jQuery plugin provides a stylish and unified animation for your browser based app.
 *
 * https://github.com/after12am/jquery.tween.js
 *
 * Copyright 2012-2013 Satoshi Okami
 * Released under the MIT license
 */
(function(c){function u(){this.y=this.x=0;this.rotatey=this.rotatex=null;this.skewy=this.skewx=this.scaley=this.scalex=this.rotatez=0}function v(a){this.elem=a;this.src=c(a).data("tween:transform")||h.factory();this.dest=h.factory();this.matrix=new n;this.def={x:c(a).data("tween:def.x")||c(a).data("tween:def.x",parseInt(c(a).css("left"),10)||0).data("tween:def.x"),y:c(a).data("tween:def.y")||c(a).data("tween:def.y",parseInt(c(a).css("top"),10)||0).data("tween:def.y")}}function w(a,b){(new v(a)).animate(b.props,
b.duration,b.delay,b.easing,b.complete)}function z(a){return function(){var b=l(this.style,"transition")in this.style,b=c.fn.tween.debug.animateType||(b?"transition":"animation");switch(q){case "o":return w(this,a)}switch(b){case "transition":var b=c(this).data("tween:transform")||h.factory(),d=new r(this);d.style(a.style);d.transform(b.update(a.props).toString());for(var e in a.props)!b[e]&&"perspective"!==e&&d.set(e,a.props[e]);void 0!=a.props.origin&&c(this).css(l(this.style,"transform-origin"),
a.props.origin);void 0!=a.props.perspective&&c(this).parent().css(l(this.style,"perspective"),a.props.perspective);d.transit(a.duration,a.delay,a.easing,a.complete);c(this).data("tween:transform",b);break;case "animation":return w(this,a)}}}function r(a){this.elem=a;this.styles={}}var l=function(a,b){var d=["Webkit","O","Moz","ms"];if(b in a)return b;for(var e=b.charAt(0).toUpperCase()+b.slice(1),f=b,c=d.length;c--;)if(b=d[c]+e,b in a)return b;return f},q=function(){if(window.getComputedStyle){var a=
window.getComputedStyle(document.documentElement,"");return(Array.prototype.slice.call(a).join("").match(/-(moz|webkit|ms)-/)||""===a.OLink&&["","o"])[1]}}();(function(){var a=c("<div>")[0],b={webkit:"webkitTransitionEnd",moz:"transitionend",ms:"msTransitionEnd",o:"webkitTransitionEnd"},d;for(d in b)if(q===d)return b[d];if("transitionend"in a.style)return"transitionend"})();var x=!!window.navigator.userAgent.toLowerCase().match(/msie/),o=function(){var a=Math.PI/180;return function(b){return b*a}}();
(function(){var a=180/Math.PI;return function(b){return b*a}})();var s=function(){var a=Math.pow(10,3);return function(b){return Math.round(b*a)/a}}();u.prototype={center:function(a){var b=0,d=0,e=0,f=0,j=a.matrix.toArray(),e=e+(j[4]+a.def.x),f=f+(j[5]+a.def.y);if(this.scalex||this.rotatey||this.skewx)b=-(parseInt(c(a.elem).width(),10)-a.src.width)/2;if(this.scaley||this.rotatex||this.skewy)d=-(parseInt(c(a.elem).height(),10)-a.src.height)/2;this.rotatez&&(b=-(a.elem.offsetWidth/2)+a.elem.clientWidth/
2,d=-(a.elem.offsetHeight/2)+a.elem.clientHeight/2);c(a.elem).css({left:i("%spx",e),top:i("%spx",f),marginLeft:i("%spx",b),marginTop:i("%spx",d)})}};v.prototype={set:function(a,b){var d=l(this.elem.style,a);c(this.elem).css(d,b);return this},get:function(a){a=l(this.elem.style,a);return c(this.elem).css(a)},transform:function(a){for(var a=a.toArray(),b=0;b<a.length;b++)a[b]=s(a[b]);this.set("transform",i("matrix(%s,%s,%s,%s,%s,%s)",a[0],a[1],a[2],a[3],a[4],a[5]))},dxImageTransform:function(a){for(var a=
a.toArray(),b=0;b<a.length;b++)a[b]=s(a[b]);this.set("filter",i("progid:DXImageTransform.Microsoft.Matrix(M11=%s, M12=%s, M21=%s, M22=%s,sizingMethod='auto expand');",a[0],a[2],a[1],a[3]))},animate:function(a,b,d,e,f){this.dest.update(a);this.src.width=parseInt(c(this.elem).width(),10);this.src.height=parseInt(c(this.elem).height(),10);var j={},g;for(g in a)g in this.dest&&(j["__"+g]=this.dest[g]-this.src[g]);for(g in a)this.dest[g]||(j[g]=a[g]);parseInt(c(this.elem).css("margin"))&&c(this.elem).css("margin",
"0");c(this.elem).delay(d).animate(c.extend(j,{___update:!0}),{duration:b,easing:e,complete:this.complete(this,f),step:this.update(this,new u)});c(this.elem).dequeue()},update:function(a,b){return function(d,e){var f=e.prop.replace(/__/,"");f in a.src&&(b[f]=d);"_update"!==f&&(a.matrix=new n,a.matrix=a.matrix.translate({x:b.x+a.src.x,y:b.y+a.src.y}),a.matrix=a.matrix.rotate(o(b.rotatez+a.src.rotatez)),a.matrix=null!==b.rotatex||null!==b.rotatey?a.matrix.scale({x:Math.cos(o((b.rotatey||0)+a.src.rotatey)),
y:Math.cos(o((b.rotatex||0)+a.src.rotatex))}):a.matrix.scale({x:b.scalex+a.src.scalex,y:b.scaley+a.src.scaley}),a.matrix=a.matrix.skew({x:o(b.skewx+a.src.skewx),y:o(b.skewy+a.src.skewy)}),x?(a.dxImageTransform(a.matrix),b.center(a)):a.transform(a.matrix))}},complete:function(a,b){return function(){c(a.elem).data("tween:transform",a.dest);c.proxy(b,a.elem)()}}};if(!c.cssHooks)throw"jQuery 1.4.3 or above is required for this plugin to work";c.cssHooks.x={get:function(a){return(c(a).data("tween:transform")||
h.factory()).x},set:function(a,b){c(a).tween({x:parseInt(b,10)},0)}};c.cssHooks.y={get:function(a){return(c(a).data("tween:transform")||h.factory()).y},set:function(a,b){c(a).tween({y:parseInt(b,10)},0)}};c.cssHooks.z={get:function(a){return(c(a).data("tween:transform")||h.factory()).z},set:function(a,b){c(a).tween({z:parseInt(b,10)},0)}};c.cssHooks.rotate={get:function(a){return(c(a).data("tween:transform")||h.factory()).rotatez},set:function(a,b){c(a).tween({rotatez:parseInt(b,10)},0)}};c.cssHooks.rotatex=
{get:function(a){return(c(a).data("tween:transform")||h.factory()).rotatex},set:function(a,b){c(a).tween({rotatex:parseInt(b,10)},0)}};c.cssHooks.rotatey={get:function(a){return(c(a).data("tween:transform")||h.factory()).rotatey},set:function(a,b){c(a).tween({rotatey:parseInt(b,10)},0)}};c.cssHooks.rotatez={get:function(a){return(c(a).data("tween:transform")||h.factory()).rotatez},set:function(a,b){c(a).tween({rotatez:parseInt(b,10)},0)}};c.cssHooks.scale={get:function(a){a=c(a).data("tween:transform")||
h.factory();return{x:a.scalex,y:a.scaley}},set:function(a,b){c(a).tween({scalex:parseInt(b,10),scaley:parseInt(b,10)},0)}};c.cssHooks.scalex={get:function(a){return(c(a).data("tween:transform")||h.factory()).scalex},set:function(a,b){c(a).tween({scalex:parseInt(b,10)},0)}};c.cssHooks.scaley={get:function(a){return(c(a).data("tween:transform")||h.factory()).scaley},set:function(a,b){c(a).tween({scaley:parseInt(b,10)},0)}};c.cssHooks.skew={get:function(a){a=c(a).data("tween:transform")||h.factory();
return{x:a.skewx,y:a.skewy}},set:function(a,b){c(a).tween({skewx:parseInt(b,10),skewy:parseInt(b,10)},0)}};c.cssHooks.skewx={get:function(a){return(c(a).data("tween:transform")||h.factory()).skewx},set:function(a,b){c(a).tween({skewx:parseInt(b,10)},0)}};c.cssHooks.skewy={get:function(a){return(c(a).data("tween:transform")||h.factory()).skewy},set:function(a,b){c(a).tween({skewy:parseInt(b,10)},0)}};var y=function(a,b,d,e,f){return-e*(b/=f)*(b-2)+d};jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,
{def:y,"in":function(a,b,d,e,f){return e*b/f+d},out:function(a,b,d,e,f){return e*b/f+d},"in-out":function(a,b,d,e,f){return e*b/f+d},linear:jQuery.easing.linear,"ease-in-quad":function(a,b,d,e,f){return e*(b/=f)*b+d},"ease-in-cubic":function(a,b,d,e,f){return e*(b/=f)*b*b+d},"ease-in-quart":function(a,b,d,e,f){return e*(b/=f)*b*b*b+d},"ease-in-quint":function(a,b,d,e,f){return e*(b/=f)*b*b*b*b+d},"ease-in-sine":function(a,b,d,e,f){return-e*Math.cos(b/f*(Math.PI/2))+e+d},"ease-in-expo":function(a,
b,d,e,f){return 0==b?d:e*Math.pow(2,10*(b/f-1))+d},"ease-in-circ":function(a,b,d,e,f){return-e*(Math.sqrt(1-(b/=f)*b)-1)+d},"ease-in-back":function(a,b,d,e,f,c){void 0==c&&(c=1.70158);return e*(b/=f)*b*((c+1)*b-c)+d},"ease-out-quad":y,"ease-out-cubic":function(a,b,d,e,f){return e*((b=b/f-1)*b*b+1)+d},"ease-out-quart":function(a,b,d,e,f){return-e*((b=b/f-1)*b*b*b-1)+d},"ease-out-quint":function(a,b,d,e,f){return e*((b=b/f-1)*b*b*b*b+1)+d},"ease-out-sine":function(a,b,d,e,f){return e*Math.sin(b/f*(Math.PI/
2))+d},"ease-out-expo":function(a,b,d,e,f){return b==f?d+e:e*(-Math.pow(2,-10*b/f)+1)+d},"ease-out-circ":function(a,b,d,e,f){return e*Math.sqrt(1-(b=b/f-1)*b)+d},"ease-out-back":function(a,b,d,e,f,c){void 0==c&&(c=1.70158);return e*((b=b/f-1)*b*((c+1)*b+c)+1)+d},"ease-in-out-quad":function(a,b,d,e,c){return 1>(b/=c/2)?e/2*b*b+d:-e/2*(--b*(b-2)-1)+d},"ease-in-out-cubic":function(a,b,d,e,c){return 1>(b/=c/2)?e/2*b*b*b+d:e/2*((b-=2)*b*b+2)+d},"ease-in-out-quart":function(a,b,d,e,c){return 1>(b/=c/2)?
e/2*b*b*b*b+d:-e/2*((b-=2)*b*b*b-2)+d},"ease-in-out-quint":function(a,b,d,e,c){return 1>(b/=c/2)?e/2*b*b*b*b*b+d:e/2*((b-=2)*b*b*b*b+2)+d},"ease-in-out-sine":function(a,b,d,e,c){return-e/2*(Math.cos(Math.PI*b/c)-1)+d},"ease-in-out-expo":function(a,b,d,e,c){return 0==b?d:b==c?d+e:1>(b/=c/2)?e/2*Math.pow(2,10*(b-1))+d:e/2*(-Math.pow(2,-10*--b)+2)+d},"ease-in-out-circ":function(a,b,d,e,c){return 1>(b/=c/2)?-e/2*(Math.sqrt(1-b*b)-1)+d:e/2*(Math.sqrt(1-(b-=2)*b)+1)+d},"ease-in-out-back":function(a,b,d,
c,f,j){void 0==j&&(j=1.70158);return 1>(b/=f/2)?c/2*b*b*(((j*=1.525)+1)*b-j)+d:c/2*((b-=2)*b*(((j*=1.525)+1)*b+j)+2)+d}});o=function(){var a=Math.PI/180;return function(b){return b*a}}();(function(){var a=180/Math.PI;return function(b){return b*a}})();var s=function(){var a=Math.pow(10,3);return function(b){return Math.round(b*a)/a}}(),n=function(a){this.base=a||[1,0,0,0,1,0]};n.prototype={_multiply:function(a,b,d,c,f,j,g,h,i,m,k,l){return new n([a*g+b*m,a*h+b*k,a*i+b*l+d,c*g+f*m,c*h+f*k,c*i+f*l+
j])},multiply:function(a){return this._multiply.apply(this,this.base.concat(a))},translate:function(a){return this.multiply([1,0,a.x,0,1,a.y])},rotate:function(a){var b=Math.sin(a),a=Math.cos(a);return this.multiply([a,b,0,-b,a,0])},scale:function(a){return this.multiply([a.x,0,0,0,a.y,0])},skew:function(a){return this.multiply([1,a.y||0,0,a.x||0,1,0])},toArray:function(){var a=this.base;return[a[0],a[1],a[3],a[4],a[2],a[5]]}};n.parseArray=function(a){return new n([a[0],a[1],a[4],a[2],a[3],a[5]])};
Object.create||(Object.create=function(a){function b(){}if(1<arguments.length)throw Error("Object.create implementation only accepts the first parameter.");b.prototype=a;return new b});var h=function(){this.rotatez=this.rotatey=this.rotatex=this.z=this.y=this.x=0;this.scalez=this.scaley=this.scalex=1;this.skewy=this.skewx=0;this.origin="50% 50%";this.perspective="none"};h.factory=function(){switch(q){case "o":return new t;default:return new h}};h.prototype.toAbs=function(a,b){var d;if(typeof b===
"string"&&(d=b.match(/^\s*(\+|-)=\s*([0-9]+)\s*$/)))switch(d[1]){case "+":b=this[a]+ +d[2];break;case "-":b=this[a]-+d[2]}return+b};h.prototype.set=function(a,b){this[a]=b;return this};h.prototype.update=function(a){for(var b in a)this[b]!==void 0&&typeof this[b]!=="function"&&this.set(b,this.toAbs(b,a[b]));return this};h.prototype.translate=function(){return i("translate(%spx,%spx)",this.x,this.y)};h.prototype.translateX=function(){return i("translateX(%spx)",this.x)};h.prototype.translateY=function(){return i("translateY(%spx)",
this.y)};h.prototype.translateZ=function(){return i("translateZ(%spx)",this.z)};h.prototype.translate3d=function(){return i("translate3d(%spx,%spx,%spx)",this.x,this.y,this.z)};h.prototype.rotateX=function(){return i("rotateX(%sdeg)",this.rotatex)};h.prototype.rotateY=function(){return i("rotateY(%sdeg)",this.rotatey)};h.prototype.rotateZ=function(){return i("rotateZ(%sdeg)",this.rotatez)};h.prototype.scale=function(){return i("scale(%s,%s)",this.scalex,this.scaley)};h.prototype.scaleX=function(){return i("scaleX(%s)",
this.scalex)};h.prototype.scaleY=function(){return i("scaleY(%s)",this.scaley)};h.prototype.scaleZ=function(){return i("scaleZ(%s)",this.scalez)};h.prototype.scale3d=function(){return i("scale3d(%s,%s,%s)",this.scalex,this.scaley,this.scalez)};h.prototype.skew=function(){return i("skew({x}deg,{y}deg)",this.skewx,this.skewy)};h.prototype.skewX=function(){return i("skewX(%sdeg)",this.skewx)};h.prototype.skewY=function(){return i("skewY(%sdeg)",this.skewy)};h.prototype.toString=function(){return[this.translate3d(),
this.rotateX(),this.rotateY(),this.rotateZ(),this.scale(),this.skewX(),this.skewY()].join(" ")};var t=function(){h.call(this)};t.prototype=Object.create(h.prototype);t.prototype.toString=function(){return[this.translate(),this.rotateZ(),this.scale(),this.skewX(),this.skewY()].join(" ")};r.cubicBezier={def:this["ease-out-quad"],"in":"ease-in",out:"ease-out","in-out":"ease-in-out",linear:"cubic-bezier(0.250, 0.250, 0.750, 0.750)","ease-in-quad":"cubic-bezier(0.550, 0.085, 0.680, 0.530)","ease-in-cubic":"cubic-bezier(0.550, 0.055, 0.675, 0.190)",
"ease-in-quart":"cubic-bezier(0.895, 0.030, 0.685, 0.220)","ease-in-quint":"cubic-bezier(0.755, 0.050, 0.855, 0.060)","ease-in-sine":"cubic-bezier(0.470, 0.000, 0.745, 0.715)","ease-in-expo":"cubic-bezier(0.950, 0.050, 0.795, 0.035)","ease-in-circ":"cubic-bezier(0.600, 0.040, 0.980, 0.335)","ease-in-back":"cubic-bezier(0.600, -0.280, 0.735, 0.045)","ease-out-quad":"cubic-bezier(0.250, 0.460, 0.450, 0.940)","ease-out-cubic":"cubic-bezier(0.215, 0.610, 0.355, 1.000)","ease-out-quart":"cubic-bezier(0.165, 0.840, 0.440, 1.000)",
"ease-out-quint":"cubic-bezier(0.230, 1.000, 0.320, 1.000)","ease-out-sine":"cubic-bezier(0.390, 0.575, 0.565, 1.000)","ease-out-expo":"cubic-bezier(0.190, 1.000, 0.220, 1.000)","ease-out-circ":"cubic-bezier(0.075, 0.820, 0.165, 1.000)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1.275)","ease-in-out-quad":"cubic-bezier(0.455, 0.030, 0.515, 0.955)","ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1.000)","ease-in-out-quart":"cubic-bezier(0.770, 0.000, 0.175, 1.000)","ease-in-out-quint":"cubic-bezier(0.860, 0.000, 0.070, 1.000)",
"ease-in-out-sine":"cubic-bezier(0.445, 0.050, 0.550, 0.950)","ease-in-out-expo":"cubic-bezier(1.000, 0.000, 0.000, 1.000)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.150, 0.860)","ease-in-out-back":"cubic-bezier(0.680, -0.550, 0.265, 1.550)"};r.prototype={set:function(a,b){this.styles[l(this.elem.style,a)]=b;return this},get:function(a){return this.styles[l(this.elem.style,a)]},duration:function(a,b){if(a===void 0)return parseInt(this.get("transition-duration"),10);this.set("transition-duration",
i("%s%s",a,b===void 0?"ms":""));return this},delay:function(a,b){if(a===void 0)return parseInt(this.get("transition-delay"),10);this.set("transition-delay",i("%s%s",a,b===void 0?"ms":""));return this},easing:function(a){if(a===void 0)return this.get("transition-timing-function");this.set("transition-timing-function",r.cubicBezier[a]);return this},property:function(a){if(a===void 0)return this.get("transition-property");this.set("transition-property",a);return this},style:function(a){if(a===void 0)return this.get("transform-style");
this.set("transform-style",a);return this},transform:function(a){if(a===void 0)return this.get("transform");this.set("transform",a);return this},transit:function(a,b,d,e){this.duration(a);this.delay(b);this.easing(d);c(this.elem).css(this.styles);if(this.duration()===0){b=0;for(a=l(this.elem.style,"transition-duration");++b>50;)if(parseInt(c(this.elem).css(a),10)===0)break}setTimeout(c.proxy(this.complete(this,e),this.elem),this.duration());return this},complete:function(a,b){return function(){c.proxy(b,
this)();c(this).dequeue();c(this).queue().length===0&&a.clear()}},clear:function(){this.duration("","").delay("","").easing("").property("");c(this.elem).css(this.styles)}};c.fn.tween=function(a,b,d,e){if(typeof b==="function"){e=b;b=void 0}if(typeof d==="function"){e=d;d=void 0}switch(typeof b){case "number":break;case "string":b=c.fx.speeds[b]||c.fx.speeds._default;break;default:b=c.fx.speeds._default}var f=c.extend(true,{},a),j;for(j in a){switch(j){case "rotate":f.rotatez=a[j];break;case "scale":f.scalex=
f.scaley=a[j];break;case "skew":f.skewx=f.skewy=a[j];break;default:continue}delete f[j]}return this.queue(z({props:f||{},duration:b,delay:0,easing:d||"def",style:"flat",property:"all",complete:e||function(){}}))};c.fn.tween.debug={animateType:""};l=function(a,b){var d=["Webkit","O","Moz","ms"];if(b in a)return b;for(var c=b.charAt(0).toUpperCase()+b.slice(1),f=b,j=d.length;j--;){b=d[j]+c;if(b in a)return b}return f};q=function(){if(window.getComputedStyle){var a=window.getComputedStyle(document.documentElement,
"");return(Array.prototype.slice.call(a).join("").match(/-(moz|webkit|ms)-/)||a.OLink===""&&["","o"])[1]}}();(function(){var a=c("<div>")[0],b={webkit:"webkitTransitionEnd",moz:"transitionend",ms:"msTransitionEnd",o:"webkitTransitionEnd"},d;for(d in b)if(q===d)return b[d];if("transitionend"in a.style)return"transitionend"})();var x=!!window.navigator.userAgent.toLowerCase().match(/msie/),i=function(){function a(b){return Object.prototype.toString.call(b).slice(8,-1).toLowerCase()}var b=function(){b.cache.hasOwnProperty(arguments[0])||
(b.cache[arguments[0]]=b.parse(arguments[0]));return b.format.call(null,b.cache[arguments[0]],arguments)};b.object_stringify=function(a,c,f,j){var g="";if(a!=null)switch(typeof a){case "function":return"[Function"+(a.name?": "+a.name:"")+"]";case "object":if(a instanceof Error)return"["+a.toString()+"]";if(c>=f)return"[Object]";if(j){j=j.slice(0);j.push(a)}if(a.length!=null){var g=g+"[",h=[],i;for(i in a)j&&j.indexOf(a[i])>=0?h.push("[Circular]"):h.push(b.object_stringify(a[i],c+1,f,j));g=g+(h.join(", ")+
"]")}else{if("getMonth"in a)return"Date("+a+")";var g=g+"{",h=[],m;for(m in a)a.hasOwnProperty(m)&&(j&&j.indexOf(a[m])>=0?h.push(m+": [Circular]"):h.push(m+": "+b.object_stringify(a[m],c+1,f,j)));g=g+(h.join(", ")+"}")}return g;case "string":return'"'+a+'"'}return""+a};b.format=function(c,e){var f=1,h=c.length,g="",l=[],p,m,k,n;for(p=0;p<h;p++){g=a(c[p]);if(g==="string")l.push(c[p]);else if(g==="array"){k=c[p];if(k[2]){g=e[f];for(m=0;m<k[2].length;m++){if(!g.hasOwnProperty(k[2][m]))throw Error(i('[sprintf] property "%s" does not exist',
k[2][m]));g=g[k[2][m]]}}else g=k[1]?e[k[1]]:e[f++];if(/[^sO]/.test(k[8])&&a(g)!="number")throw Error(i('[sprintf] expecting number but found %s "'+g+'"',a(g)));switch(k[8]){case "b":g=g.toString(2);break;case "c":g=String.fromCharCode(g);break;case "d":g=parseInt(g,10);break;case "e":g=k[7]?g.toExponential(k[7]):g.toExponential();break;case "f":g=k[7]?parseFloat(g).toFixed(k[7]):parseFloat(g);break;case "O":g=b.object_stringify(g,0,parseInt(k[7])||5);break;case "o":g=g.toString(8);break;case "s":g=
(g=""+g)&&k[7]?g.substring(0,k[7]):g;break;case "u":g=Math.abs(g);break;case "x":g=g.toString(16);break;case "X":g=g.toString(16).toUpperCase()}g=/[def]/.test(k[8])&&k[3]&&g>=0?"+"+g:g;m=k[4]?k[4]=="0"?"0":k[4].charAt(1):" ";n=k[6]-(""+g).length;if(k[6]){for(var o=[];n>0;o[--n]=m);m=o.join("")}else m="";l.push(k[5]?g+m:m+g)}}return l.join("")};b.cache={};b.parse=function(a){for(var b=[],c=[],h=0;a;){if((b=/^[^\x25]+/.exec(a))!==null)c.push(b[0]);else if((b=/^\x25{2}/.exec(a))!==null)c.push("%");else if((b=
/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosOuxX])/.exec(a))!==null){if(b[2]){var h=h|1,g=[],i=b[2],l=[];if((l=/^([a-z_][a-z_\d]*)/i.exec(i))!==null)for(g.push(l[1]);(i=i.substring(l[0].length))!=="";)if((l=/^\.([a-z_][a-z_\d]*)/i.exec(i))!==null)g.push(l[1]);else if((l=/^\[(\d+)\]/.exec(i))!==null)g.push(l[1]);else throw Error("[sprintf] "+i);else throw Error("[sprintf] "+i);b[2]=g}else h=h|2;if(h===3)throw Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
c.push(b)}else throw Error("[sprintf] "+a);a=a.substring(b[0].length)}return c};return b}()})(jQuery);