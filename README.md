jquery.cssanimate.js
====================

jquery.boost is a jquery plugin that provides smooth animation for smartphone. 
jquery.boost implements animation using css3. In case of making animation in smartphone, 
css3 is essencial, because unfortunately javascript will not give a good performance to smartphone. 
css3 give your app lightness and interactivity. css3 is powerful especially in smartphone, 
because using gpu, not cpu. This is why I recommend css3.

## Usage

The usage is easy because it was designed by reference to the jquery. The example is:

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
