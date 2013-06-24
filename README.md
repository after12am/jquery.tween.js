[jQuery cssanimate](http://after12am.github.io/jquery.cssanimate.js/)
========================================================================

jquery.cssanimate.js is a jquery plugin that provides a stylish and cute animation especially for your smartphone app using css3.
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

## Features

* support `method chain` which will executed animation serially
* support `origin` to set where rotations and scales start from
* support advanced [`easing`](https://github.com/after12am/jquery.cssanimate.js/blob/master/src/core/ease.js) function which specifies the speed curve of the transition effect
* support `2d/3d` transformation
* support `loopback` which helps you to make infinite loop animation easily
* support `prefix free` which free you from vendor prefix hell
* support `relative value` which allows you to start with `+=` or `-=`
* support [`$.fn.css`](https://github.com/after12am/jquery.cssanimate.js/blob/master/src/hook.js) which helps you to get the value of a style property for the first element in the set of matched elements and helps you to set css properties for every matched element

## Notes

* If main usage of your app is to animate lots of elements, more than 100 elements, at the same time in pc browser, I recommend you to use $.fn.animate.
* If rotate around x-axis or y-axis in `safari`, you should set perspective property like `$('any').perspective(100).cssanimate({ rotatey: '-=180'});` before rotating the element. Because safari treats as 3d.