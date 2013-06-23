var mouseover = false;

$('.wrapper').mouseover(function() {
});

$('#translateXY .thumb .box').mouseover(function() {
    $(this).cssanimate({ x: 30, y: 30 });
}).mouseout(function() {
    $(this).cssanimate({ x: 0, y: 0});
});

$('#rotateXYZ .thumb .box').mouseover(function() {
    $(this).cssanimate({ rotate: [90, 90] });
}).mouseout(function() {
    $(this).cssanimate({ rotate: [0, 0] });
});

$('#scaleXY .thumb .box').mouseover(function() {
    $(this).cssanimate({ scalex: 4, scaley: 4 });
}).mouseout(function() {
    $(this).cssanimate({ scalex: 1, scaley: 1 });
});

$('#skewXY .thumb .box').mouseover(function() {
    $(this).cssanimate({ skewx: 45, skewy: 45 });
}).mouseout(function() {
    $(this).cssanimate({ });
});

$('#opacity .thumb .box').mouseover(function() {
    $(this).cssanimate({ opacity: 0 });
}).mouseout(function() {
    $(this).cssanimate({ opacity: 1 });
});

$('#radius .thumb .box').mouseover(function() {
    $(this).cssanimate({ "border-radius": 30 });
}).mouseout(function() {
    $(this).cssanimate({ "border-radius": 0 });
});

$('.method-chaine .box').mouseover(function() {
    $(this)
        .cssanimate({ x: 100, y: 0, scale: 0.5, rotatez: 90 })
        .cssanimate({ x: 100, y: 100, scale: 1, rotatez: 180 })
        .cssanimate({ x: -100, y: 100, scale: 0.5, rotatez: 270 })
        .cssanimate({ x: -100, y: 0, scale: 1, rotatez: 360 })
        .cssanimate({ x: 0, y: 0, scale: 1 })
}).mouseout(function() {
    $(this).cssanimate({ x: 0, y: 0, scale: 1, rotatez: 0});
});

$('.transformation-origins .box').mouseover(function() {
    $(this).origin(0, 0)
        .cssanimate({ rotatez: 45 })
        .cssanimate({ rotatez: 20 })
        .cssanimate({ rotatez: 45 })
}).mouseout(function() {
    $(this).cssanimate({ rotatez: 0 });
});

$('.ease-example .box').mouseover(function() {
    $(this).cssanimate({ rotate: 360, 'background-color': '#CF3932', ease: 'snap' })
}).mouseout(function() {
    $(this).cssanimate({ rotate: 0, 'background-color': '#a8c8ca' });
});


$('.perspective .box').mouseover(function() {
    $(this).perspective(100).cssanimate({ x: 50, z: 50, rotatey: 60 })
}).mouseout(function() {
    $(this).cssanimate({ x: 0, z: 0, rotatey: 0 });
});

$('.relative-value .box').mouseover(function() {
    $(this).perspective(100).cssanimate({ z: '-=100' }, 200)
}).mouseout(function() {
    $(this).cssanimate({ z: 0 }, 200);
});

$('.css-property .box').mouseover(function() {
    $(this).cssanimate({ width: 0, 'background-color': '#CF3932' }, function() {
        // fly stars out when door is opend completely
    })
}).mouseout(function() {
    $(this).cssanimate({ width: 44, 'background-color': '#a8c8ca' });
});

$('.prefix-free .box').mouseover(function() {
    $(this).cssanimate({ transform: 'translateX(44px)' });
}).mouseout(function() {
    $(this).cssanimate({ transform: 'translateX(0px)' });
});

$('.getter-setter .box').mouseover(function() {
    $(this).css('rotatez', 45);
    $(this).text($(this).css('rotatez'));
}).mouseout(function() {
    $(this).cssanimate({ rotatez: 0 }).text('');
});

$('.loopback-example .box').mouseover(function() {
    var steps = [];
    for (var i = 0; i < 10; i++) {
        steps.push([{
            to: [Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100],
            scale: Math.random() * 1.4,
            rotate: [Math.random() * 720, Math.random() * 720, Math.random() * 720]
        }]);
    }
    $(this).perspective(1000).cssanimate(steps);
})

$('.loopback-example .stop').click(function() {
    $('.loopback-example .box').stop(true, true);
    $('.loopback-example .box').cssanimate({ to: [0, 0, 0], scale: [1, 1, 1], rotate: [0, 0, 0]});
    return false;
});
