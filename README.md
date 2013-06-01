[jQuery cssanimate](http://after12am.github.io/jquery.cssanimate.js/)
========================================================================

jquery.cssanimate.js is a jquery plugin that provides a stylish and cute animation for your smartphone application using css3.
Using css3 in dom animation will have been excellent select. Because css3 would give your app lightness and interactivity compared with javascript.
However, it is a bit difficult to controll under dynamic usage. In view of this, I have designed jquery.cssanimate.js to take advantage of knowledge of jquery of you.

## Usage

Usage is very simple. It has the same syntax as $.fn.animate.

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
$('.any').cssanimate(params, [callback]);
$('.any').cssanimate(params, [duration], [callback]);
$('.any').cssanimate(params, [duration], [delay], [callback]);
$('.any').cssanimate(params, [duration], [delay], [easing], [callback]);
</script>
```

## Notes

* support `method chain` that animation will be executed serially
* support `origin` to set where rotations and scales start from
* support advanced `easing` function specifies the speed curve of the transition effect
* support `2d/3d` transformation
