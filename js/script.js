var mouseover = false;

$('.wrapper').mouseover(function() {
});

$('#translateXY .thumb .box').mouseover(function() {
    $(this).tween({ x: 30, y: 30 });
}).mouseout(function() {
    $(this).tween({ x: 0, y: 0});
});

$('#rotateXYZ .thumb .box').mouseover(function() {
    $(this).tween({ rotatex: 90, rotatey: 90 });
}).mouseout(function() {
    $(this).tween({ rotatex: 0, rotatey: 0 });
});

$('#scaleXY .thumb .box').mouseover(function() {
    $(this).tween({ scalex: 4, scaley: 4 });
}).mouseout(function() {
    $(this).tween({ scalex: 1, scaley: 1 });
});

$('#skewXY .thumb .box').mouseover(function() {
    $(this).tween({ skewx: 45, skewy: 45 });
}).mouseout(function() {
    $(this).tween({ skewx: 0, skewy: 0 });
});

$('#opacity .thumb .box').mouseover(function() {
    $(this).tween({ opacity: 0 });
}).mouseout(function() {
    $(this).tween({ opacity: 1 });
});

$('#radius .thumb .box').mouseover(function() {
    $(this).tween({ "border-radius": 30 });
}).mouseout(function() {
    $(this).tween({ "border-radius": 0 });
});

$('.method-chaine .box').mouseover(function() {
    $(this)
        .tween({ x: 100,  y: 0,   scale: 0.5, rotatez: 90  })
        .tween({ x: 100,  y: 100, scale: 1,   rotatez: 180 })
        .tween({ x: -100, y: 100, scale: 0.5, rotatez: 270 })
        .tween({ x: -100, y: 0,   scale: 1,   rotatez: 360 })
        .tween({ x: 0,    y: 0,   scale: 1,   rotatez: 0 })
}).mouseout(function() {
    $(this).tween({ x: 0, y: 0, scale: 1, rotatez: 0});
});

/*
$('.transformation-origins .box').mouseover(function() {
    $(this).origin(0, 0)
        .tween({ rotatez: 45 })
        .tween({ rotatez: 20 })
        .tween({ rotatez: 45 })
}).mouseout(function() {
    $(this).tween({ rotatez: 0 });
});
*/

$('.ease-example .box').mouseover(function() {
    $(this).tween({ rotate: 360, 'background-color': '#CF3932', ease: 'snap' })
}).mouseout(function() {
    $(this).tween({ rotate: 0, 'background-color': '#a8c8ca' });
});


$('.perspective .box').mouseover(function() {
    $(this).tween({ perspective: 100, x: 50, z: 50, rotatey: 60 })
}).mouseout(function() {
    $(this).tween({ x: 0, z: 0, rotatey: 0 });
});

$('.relative-value .box').mouseover(function() {
    $(this).tween({ perspective: 100, z: '-=100' }, 200)
}).mouseout(function() {
    $(this).tween({ z: 0 }, 200);
});

$('.css-property .box').mouseover(function() {
    $(this).tween({ width: 0, 'background-color': '#CF3932' }, function() {
        // fly stars out when door is opend completely
    })
}).mouseout(function() {
    $(this).tween({ width: 44, 'background-color': '#a8c8ca' });
});

$('.prefix-free .box').mouseover(function() {
    $(this).tween({ transform: 'translateX(44px)' });
}).mouseout(function() {
    $(this).tween({ transform: 'translateX(0px)' });
});

$('.getter-setter .box').mouseover(function() {
    $(this).css('rotatez', 45);
    $(this).text($(this).css('rotatez'));
}).mouseout(function() {
    $(this).tween({ rotatez: 0 }).text('');
});

$('.loopback-example .box').mouseover(function() {
    var steps = [];
    for (var i = 0; i < 10; i++) {
        steps.push([{
            perspective: 1000,
//            to:     [Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100],
            scale:   Math.random() * 1.4,
            // rotate: [Math.random() * 720, Math.random() * 720, Math.random() * 720]
        }]);
    }
    console.log(steps)
    $(this).tween(steps);
})

$('.loopback-example .stop').click(function() {
    $('.loopback-example .box').stop(true, true);
    $('.loopback-example .box').tween({ to: [0, 0, 0], scale: [1, 1, 1], rotate: [0, 0, 0]});
    return false;
});
