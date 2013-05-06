jquery.cssanimate.js
====================

This is a jquery plugin that provides smooth animation for smartphone using css3. 
css3 is only way for making animation in smartphone if except WebGL. Javascript is also available
in smartphone, but would not give a good animation to smartphone. In contrast, css3 would give 
your app lightness and interactivity. css3 is powerful especially in smartphone for using gpu. 
But css3 is a bit difficult to controll under dynamic usage.  So this has designed to take advantage 
of knowledge of jquery of you.

## Usage

The usage is easy because this was designed by reference to the jquery. The example is:

```html
<script src='jquery.js'></script>
<script src='jquery.cssanimate.js'></script>
<script type="text/javascript">
    var params = {
        x: 100,
        rotatez: 100,
        width: 100, // able to transform css properties
        opacity: 0
    };
    // $('.any').cssanimate(params, [callback]);
    // $('.any').cssanimate(params, [duration], [callback]);
    // $('.any').cssanimate(params, [duration], [delay], [callback]);
    $('.any').cssanimate(params, [duration], [delay], [easing], [callback]);
</script>
```

## Shortcuts

Some shortcuts are prepared.

```javascript
// Translate on specific axis.
$('.any').translateX(x, [duration], [delay], [easing], [callback]);
$('.any').translateY(y, [duration], [delay], [easing], [callback]);
$('.any').translateZ(z, perspective, [duration], [delay], [easing], [callback]);
$('.any').translate(x, y, [duration], [delay], [easing], [callback]);
$('.any').translate3d(x, y, z, perspective, [duration], [delay], [easing], [callback]);

// Scale on specific axis.
$('.any').scaleX(scalex, [duration], [delay], [easing], [callback]);
$('.any').scaleY(scaley, [duration], [delay], [easing], [callback]);
$('.any').scale(scalex, scaley, [duration], [delay], [easing], [callback]);
// $('.any').scaleZ(scalez, perspective, [duration], [delay], [easing], [callback]);
// $('.any').scale3d(scalex, scaley, scalez, perspective, [duration], [delay], [easing], [callback]);

// Rotate on specific axis.
$('.any').rotateX(rotatex, [duration], [delay], [easing], [callback]);
$('.any').rotateY(rotatey, perspective, [duration], [delay], [easing], [callback]);
$('.any').rotateZ(rotatez, [duration], [delay], [easing], [callback]);
$('.any').rotate(rotate, [duration], [delay], [easing], [callback]);
$('.any').rotate3d(x, y, z, rotate, perspective, [duration], [delay], [easing], [callback]);

// Skew on specific axis.
$('.any').skewX(skewx, [duration], [delay], [easing], [callback]);
$('.any').skewY(skewy, [duration], [delay], [easing], [callback]);
$('.any').skew(skewx, skewy, [duration], [delay], [easing], [callback]);
```

## Notes

* `scaleZ``scale3d` are not implemented.