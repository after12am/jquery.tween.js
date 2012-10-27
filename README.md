# jquery.smoosy

jquery.smoosy is a jquery plugin that provides smooth animation for smartphone. jquery.smoosy implements animation using css3. In case of making animation in smartphone, css3 is essencial, because unfortunately javascript will not give a good performance to smartphone. css3 give your app lightness and interactivity. css3 is powerful especially in smartphone, because using gpu, not cpu. This is why I recommend css3. Let's get it started.

## Usage

### include

```
<script src='jquery.js'></script>
<script src='jquery.smoosy.min.js'></script>
```

### basic usage

```
var params = {
    x: {#x},
    rotatez: {#rotatex},
    duration: {#time} // milliseconds
};
$(elem).smoosy(params, [duration], [delay], [easing], [callback]);
```

### other ways

```
$.smoosy(params, [callback]);
$.smoosy(params, [duration], [callback]);
$.smoosy(params, [duration], [delay], [callback]);
$.smoosy(params, [duration], [delay], [easing], [callback]);
```

### available properties

```
@x int
@y int
@z int
@rotate int
@rotate object [1, 0, 0, rotate]
@rotate object {x:1 y:0 z:0 rotate}
@rotatex int
@rotatey int
@rotatez int
@scale object [scalex, scaley, scalez]
@scale object {x:scalex, y:scaley, z:scalez}
@scale int
@scalex int
@scaley int
@scalez int
@skew object [x, y]
@skew object {x:int,  y:int}
@skewx int
@skewy int
@perspective int
@property ['width'] // target property for animation. if you don't set 'all' would be used.
@origin '0% 0%'
@style 'flat' // or 'preserve-3d'
@duration int // duration time
@delay int // delay time
@easing string // value css3 transition provides
```

and css properties are available. width, height, opacity...

```
var params = {
    x: {#x},
    rotatez: {#rotatex},
    width: {#width},
    duration: {#time} // milliseconds
};
$(elem).smoosy(params, [duration], [delay], [easing], [callback]);
```