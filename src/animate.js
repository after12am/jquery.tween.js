function Animation(elem) {
  this.elem = elem;
  this.src = $(elem).data('tween:transform') || Transform.factory();
  this.dest = Transform.factory();
  this.matrix = new Matrix();
  this.position = $(elem).data('tween.position.default') || this.setPosition();
}

Animation.prototype = {
  
  
  isIE: (function() {
    return !!isIE();
  })(),
  
  isVersionIfIE: (function() {
    var m = isIE();
    if (m) return +m[1];
    return false;
  })(),
  
  css: function(k, v) {
    $(this.elem).css(vendorPropName(this.elem.style, k), v);
  },
  
  round: function(v) {
    return Math.round(v * 1000) / 1000;
  },
  
  // set default position
  setPosition: function() {
    var position = {
      x: parseInt($(this.elem).css('left'), 10) || 0,
      y: parseInt($(this.elem).css('top'), 10) || 0
    };
    $(this.elem).data('tween.position.default', position);
    return position;
  },
  
  setTransform: function(matrix) {
    var arr = matrix.toArray();
    for (var i = 0; i < arr.length; i++) arr[i] = this.round(arr[i]);
    this.css('transform', sprintf('matrix(%s,%s,%s,%s,%s,%s)',
      arr[0],
      arr[1],
      arr[2],
      arr[3],
      arr[4],
      arr[5]
    ));
  },
  
  setDxImageTransform: function(matrix) {
    var arr = matrix.toArray();
    for (var i = 0; i < arr.length; i++) arr[i] = this.round(arr[i]);
    // if IE8, use -ms-filter. If IE6 and 7, use filter.
    var k = this.isVersionIfIE === 8 ? '-ms-filter' : 'filter';
    this.css(k, sprintf("progid:DXImageTransform.Microsoft.Matrix(M11=%s, M12=%s, M21=%s, M22=%s,sizingMethod='auto expand');",
      arr[0],
      arr[2],
      arr[1],
      arr[3]
    ));
  },
  
  animate: function(props, duration, easing, complete) {
    
    this.dest.update(props);
    this.src.width = parseInt($(this.elem).width(), 10);
    this.src.height = parseInt($(this.elem).height(), 10);
    
    var transition = {};
    for (var k in props) {
      if (k in this.dest) {
        transition[k] = this.dest[k] - this.src[k];
      }
    }
    
    // add non transform properties
    // e.g. width, height, color ...
    for (var k in props) {
      if (!this.dest[k]) {
        transition[k] = props[k];
      }
    }
    
    $(this.elem).animate($.extend(transition, { _update: true }), {
      duration: duration, 
      easing: easing, 
      complete: $.proxy(complete, this.elem),
      step: this.update(this)
    });
  },
  
  update: function(that) {
    var inc = {
      x: 0,
      y: 0,
      rotatez: 0,
      scalex: 0,
      scaley: 0,
      skewx: 0,
      skewy: 0
    };
    return function(value, init) {
      if (init.prop in that.src) inc[init.prop] = value;
      if (init.prop === '_update') {
        
        var matrix = new Matrix();
        var margin = { x: 0, y: 0 }, position = { x: 0, y: 0 };
        
        matrix = matrix.translate({
          x: inc.x + that.src.x,
          y: inc.y + that.src.y
        });
        
        matrix = matrix.rotate(degToRad(inc.rotatez + that.src.rotatez));
        
        matrix = matrix.scale({
          x: inc.scalex + that.src.scalex,
          y: inc.scaley + that.src.scaley
        });
        
        matrix = matrix.skew({
          x: degToRad(inc.skewx + that.src.skewx),
          y: degToRad(inc.skewy + that.src.skewy)
        });
        
        if (that.isIE) that.setDxImageTransform(matrix);
        else that.setTransform(matrix);
        
        if (that.isIE) {
          var arr = matrix.toArray();
          position.x += arr[4] + that.position.x;
          position.y += arr[5] + that.position.y;
        }
        
        if (inc.scalex) position.x = -(parseInt($(that.elem).width(), 10) - that.src.width) / 2;
        if (inc.scaley) position.y = -(parseInt($(that.elem).height(), 10) - that.src.height) / 2;
        
        // center the transform origin, from pbakaus's Transformie http://github.com/pbakaus/transformie
        if (inc.rotatez) {
          margin.x = -(that.elem.offsetWidth / 2) + (that.elem.clientWidth / 2);
          margin.y = -(that.elem.offsetHeight / 2) + (that.elem.clientHeight / 2);
        }
        
        if (that.isIE) {
          $(that.elem).css({
            left: sprintf('%spx', position.x),
            top: sprintf('%spx', position.y)
          });
        }
        
        $(that.elem).css({
          marginLeft: sprintf('%spx', margin.x),
          marginTop: sprintf('%spx', margin.y)
        });
      }
    }
  }
}

function animate(elem, options) {
  new Animation(elem).animate(options.props, options.duration, options.easing, options.complete);
  $(elem).dequeue();
}