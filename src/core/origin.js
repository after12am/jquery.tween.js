// transform origin is shifted after the origin have been applied to dom element.
// confirmed in Chrome.
$.fn.origin = function(yaxis, xaxis) {
    var prefix = Style.prefix;
    var css = {};
    css['{0}transition-duration'.format(prefix)] = '0';
    css['{0}transform-origin'.format(prefix)] = '{0} {1}'.format(yaxis, xaxis);
    $(this).css(css);
    var i = 0;
    while (1) {
        if ($(this).css('{0}transition-duration'.format(prefix)).match(/^0/)) break;
        if (++i > 50) break; // avoid infinite loop
    }
    return this;
}