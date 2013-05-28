// transform origin is shifted after the origin have been applied to dom element.
// confirmed in Chrome.
$.fn.origin = function(top, left) {
    var props = {}, prefix = Style.prefix;
    props['{0}transition-duration'.format(prefix)] = '0s';
    props['{0}transform-origin'.format(prefix)] = '{0} {1}'.format(top, left);
    $(this).css(props);
    var i = 0;
    while (1) {
        var adopted = $(this).css('{0}transition-duration'.format(prefix));
        if (adopted === '0s') break;
        if (++i > 50) break; // avoid infinite loop
    }
    return this;
}