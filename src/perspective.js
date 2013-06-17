/*
    Whether you use perspective.
    If you want to make perspective disable, set false on depth.
*/
$.fn.perspective = function(depth) {
    return $(this).cssanimate.perspective($(this), depth);
}