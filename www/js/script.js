var mouseover = false;

$('#translateX .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ x: 30 });
}).mouseout(function() {
    $(this).find('.box').cssanimate(); // cssanimate() equals cssanimate({ x: 0 })
});

$('#translateY .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ y: 30 });
}).mouseout(function() {
    $(this).find('.box').cssanimate();
});

$('#translateXY .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ x: 30, y: 30 });
}).mouseout(function() {
    $(this).find('.box').cssanimate();
});

$('#rotateX .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ rotatex: 180 });
}).mouseout(function() {
    $(this).find('.box').cssanimate();
});

$('#rotateY .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ rotatey: 180 });
}).mouseout(function() {
    $(this).find('.box').cssanimate();
});

$('#rotateXYZ .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ rotate: [1, 1, 0, 180] });
}).mouseout(function() {
    $(this).find('.box').cssanimate();
});

$('#scaleX .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ scalex: 4 });
}).mouseout(function() {
    $(this).find('.box').cssanimate();
});

$('#scaleY .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ scaley: 4 });
}).mouseout(function() {
    $(this).find('.box').cssanimate();
});

$('#scaleXY .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ scalex: 4, scaley: 4 });
}).mouseout(function() {
    $(this).find('.box').cssanimate();
});

$('#skewX .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ skewx: 45 });
}).mouseout(function() {
    $(this).find('.box').cssanimate();
});

$('#skewY .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ skewy: 45 });
}).mouseout(function() {
    $(this).find('.box').cssanimate();
});

$('#skewXY .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ skewx: 45, skewy: 45 });
}).mouseout(function() {
    $(this).find('.box').cssanimate();
});

$('#opacity .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ opacity: 0 });
}).mouseout(function() {
    $(this).find('.box').cssanimate({ opacity: 1 });
});

$('#width .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ width: 120 });
}).mouseout(function() {
    $(this).find('.box').cssanimate({ width: 30 });
});

$('#radius .thumb').mouseover(function() {
    $(this).find('.box').cssanimate({ "border-radius": 30 });
}).mouseout(function() {
    $(this).find('.box').cssanimate({ "border-radius": 0 });
});

/*
$('#transitions .thumb').eq(0).mouseover(function() {
    mouseover = true;
    (function runner() {
        $('.box').cssanimate({ x: 30 });
        $('.box').cssanimate({ x: 0 }, function() {
            if (mouseover) runner();
        });
    })();
}).mouseout(function() {
    mouseover = false;
});
*/