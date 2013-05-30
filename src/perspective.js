/*
    Whether you use perspective. If you want to make perspective disable, set false on depth.
*/
$.fn.perspective = function(depth) {
    $(this).parent().css(browser.css.property('perspective'), '{0}px'.format(+depth || 0));
    var i = 0;
    // We have to wait until css property is set.
    // If not so, next queue might be executed before setting css to dom.
    while (1) {
        if ($(this).parent().css(browser.css.property('duration')).match(/^0/)) break;
        if (++i > 50) break; // avoid infinite loop
    }
    return this;
}