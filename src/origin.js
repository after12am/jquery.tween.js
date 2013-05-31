// transform origin is shifted after the origin have been applied to dom element.
// confirmed in Chrome.
$.fn.origin = function(top, left) {
    var that = this;
    $(this).queue(function() {
        var params = {};
        params[browser.css.property('origin')] = str('{0} {1}').format(top, left);
        params[browser.css.property('duration')] = '0';
        $(this).css(params);
        var i = 0;
        // We have to wait until css property is set.
        // If not so, next queue might be executed before setting css to dom.
        while (1) {
            if ($(this).css(browser.css.property('duration')).match(/^0/)) break;
            if (++i > 50) break; // avoid infinite loop
        }
        $(that).dequeue();
    });
    return this;
}