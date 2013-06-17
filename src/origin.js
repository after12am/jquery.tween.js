/*
    The transform-origin has to applied to element before apply any other transformation.
    If not so, transform-origin of element would have shifted a little.
*/
$.fn.origin = function(top, left) {
    return $(this).cssanimate.origin($(this), top, left);
}