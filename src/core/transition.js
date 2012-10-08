
$.fn.transition = function(duration, delay, easing, origin, style) {
    
    this.attr('transit-duration', duration)
        .attr('transit-delay', delay)
        .attr('transit-easing', easing)
        .attr('transit-origin', origin)
        .attr('transit-style', style);
    
    console.error('$.fn.transition is under develop');
};
