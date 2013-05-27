jquery.cssanimate.js
====================

jquery.cssanimate.js is a jquery plugin provides smooth animation for smartphone using css3. 
css3 is the only way for making stylish animation in smartphone if except WebGL. Javascript is also available
in smartphone, but would not give a good animation to smartphone. In contrast, css3 would give 
your app lightness, interactivity and powerful for using gpu. 
But css3 is a bit difficult to controll under dynamic usage.  So jquery.cssanimate.js has been designed to take advantage 
of knowledge of jquery of you.

## Demo
### [View Live Demo](http://after12am.github.io/jquery.cssanimate.js/)

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

## Notes

* `scaleZ``scale3d` are not implemented.
