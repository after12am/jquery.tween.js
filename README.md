# jquery.smoosy

jquery.smoosy is a jquery plugin that provides smooth animation for smartphone. jquery.smoosy implements animation using css3. In case of making animation in mobile, css3 is essencial. unfortunately javascript don't give a good performance in mobile. In contrast, css3 give your app lightness and interactivity. css3 is very useful and powerful in smartphone. Get experience.

## Usage
```
var params = {
    x: destinate_to_x,
    rotatez: destinate_to_rotatex
};

$(elem).transit(params, [duration], [delay], [easing], [callback]);
```

## property

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
@property ['width'] // target property of animation. if you don't set 'all' would be used.
@property 'width'
@origin '0% 0%'
@style 'flat' // or 'preserve-3d'
@duration int
@delay int
@easing int

and css properties... 
for example, width, height, opacity...
```