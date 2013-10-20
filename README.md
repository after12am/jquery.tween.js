jQuery Tween
============

This is a jquery plugin provides a stylish and unified animation for your browser based app. 
This plugin is designed to work on modern browsers including browsers of smartphone in addition to old browsers like IE 6-8.


|              | ![CHROME][chrome] | ![FIREFOX][firefox] | ![OPERA][opera]   | ![SAFARI][safari] | ![IE10][ie10] | ![IE9][ie9] | ![IE8][ie8] | ![IE7][ie7] | ![IE6][ie6] |
|:------------:|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|
| x            | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] |
| y            | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] |
| z            | ![OK][OK] | ![OK][OK] | ![NG][NG] | ![OK][OK] | ![OK][OK] | ![NG][NG] | ![NG][NG] | ![NG][NG] | ![NG][NG] |
| rotate       | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] |
| rotatex      | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] |
| rotatey      | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] |
| rotatez      | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] |
| scale        | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] |
| scalex       | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] |
| scaley       | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] |
| skew         | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] |
| skewx        | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] |
| skewy        | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] | ![OK][OK] |

<!--           | CHROME    | FIREFOX   | OPERA     | SAFARI    | IE10      | IE9       | IE8       | IE7       | IE6       | -->

[chrome]: https://raw.github.com/paulirish/browser-logos/master/chrome/chrome_48x48.png
[firefox]: https://raw.github.com/paulirish/browser-logos/master/firefox/firefox_48x48.png
[safari]: https://raw.github.com/paulirish/browser-logos/master/safari/safari_48x48.png
[opera]: https://raw.github.com/paulirish/browser-logos/master/opera/opera_48x48.png
[ie10]: https://raw.github.com/paulirish/browser-logos/master/ie10/ie10_48x48.png
[ie9]: https://raw.github.com/paulirish/browser-logos/master/ie9-10/ie9-10_48x48.png
[ie8]: https://raw.github.com/paulirish/browser-logos/master/ie7-8/ie7-8_48x48.png
[ie7]: https://raw.github.com/paulirish/browser-logos/master/ie7-8/ie7-8_48x48.png
[ie6]: https://raw.github.com/paulirish/browser-logos/master/ie6/ie6_48x48.png
[OK]: https://raw.github.com/after12am/jquery.cssanimate.js/dev/images/tick.png
[NG]: https://raw.github.com/after12am/jquery.cssanimate.js/dev/images/cross.png

## Usage

You can take advantage of knowledge of jquery of you. The syntax is the same as $.fn.animate.

```html
<script src="jquery.js"></script>
<script src='jquery.tween.js'></script>
<script type="text/javascript">
var props = {
  x: 100, // translate on x-axis
  rotate: 45, // rotate on z-axis
  scale: 2,  // scale on xy-axis
  skew: 45, // skew on xy-axis
  width: 100, // able to transform css properties
  opacity: 0
};
$('.any').tween(props[,duration][,easing][,callback]);
</script>
```

### IE6-9

* You can not use margin property. This is used for fixing bug of origin.

### IE6-9 and Opera

* You can not use (rotatex|rotatey) and (scale|scalex|scaley) at the same time due to the implementation. 
