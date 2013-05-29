// transform origin is shifted after the origin have been applied to dom element.
// confirmed in Chrome.
$.fn.origin = function(top, left) {
    var p = Style.prefix;
    var params = {};
    params['{0}transform-origin'.format(p)] = '{0} {1}'.format(top, left);
    params['{0}transition-duration'.format(p)] = '0';
    $(this).css(params);
    var i = 0;
    while (1) {
        if ($(this).css('{0}transition-duration'.format(p)).match(/^0/)) break;
        if (++i > 50) break; // avoid infinite loop
    }
    return this;
}