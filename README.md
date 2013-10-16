jquery.tween.js
===============

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

> **Note**
> * Unfortunately we have to set 0 to margin of target element, that will be transformed, on IE6-9 and Opera. So don't use margin on those browsers.
> * Modern browsers except Opera have been implemented by Transform 3D. The others by Transform 2D. You can not use (rotatex|rotatey) and (scale|scalex|scaley) on old browsers due to the implementation of rotatex and rotatey. 

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
