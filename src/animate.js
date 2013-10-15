function Animation(elem) {
  this.elem = elem;
  this.src = $(elem).data('tween:transform') || Transform.factory();
  this.dest = Transform.factory();
  this.matrix = new Matrix();
  this.position = $(elem).data('tween.position.default') || this.setPosition();
}

Animation.prototype = {
  
  css: function(k, v) {
    $(this.elem).css(vendorPropName(this.elem.style, k), v);
    return this;
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
    var k = versionIfIE === 8 ? '-ms-filter' : 'filter';
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
        transition['__'+k] = this.dest[k] - this.src[k];
      }
    }
    
    // add non transform properties
    // e.g. width, height, color ...
    for (var k in props) {
      if (!this.dest[k]) {
        transition[k] = props[k];
      }
    }
    
    // if margin is set, animation will be rendered dirty.
    if (parseInt($(this.elem).css('margin'))) {
      $(this.elem).css('margin', '0');
    }
    
    $(this.elem).animate($.extend(transition, { ___update: true }), {
      duration: duration, 
      easing: easing, 
      complete: this.complete(this, complete),
      step: this.update(this)
    });
  },
  
  update: function(that) {
    var inc = {
      x: 0,
      y: 0,
      rotatex: null,
      rotatey: null,
      rotatez: 0,
      scalex: 0,
      scaley: 0,
      skewx: 0,
      skewy: 0
    };
    return function(value, init) {
      var k = init.prop.replace(/__/, '');
      if (k in that.src) inc[k] = value;
      if (k === '_update') {
        
        var matrix = new Matrix();
        
        matrix = matrix.translate({
          x: inc.x + that.src.x,
          y: inc.y + that.src.y
        });
        
        matrix = matrix.rotate(degToRad(inc.rotatez + that.src.rotatez));
        
        // rotatex and rotatey is important more than scale
        // so we use scale for rotating on XY-axis.
        if (inc.rotatex !== null || inc.rotatey !== null) {
          matrix = matrix.scale({
            x: Math.cos(degToRad((inc.rotatey || 0) + that.src.rotatey)),
            y: Math.cos(degToRad((inc.rotatex || 0) + that.src.rotatex))
          });
        } else {
          matrix = matrix.scale({
            x: inc.scalex + that.src.scalex,
            y: inc.scaley + that.src.scaley
          });
        }
        
        matrix = matrix.skew({
          x: degToRad(inc.skewx + that.src.skewx),
          y: degToRad(inc.skewy + that.src.skewy)
        });
        
        // set transition style
        if (isIE) that.setDxImageTransform(matrix);
        else that.setTransform(matrix);
        
        // adjustments for ie
        if (isIE) that.fixOnCenter(matrix, inc);
      }
    }
  },
  
  complete: function(that, complete) {
    return function() {
      $(that.elem).data('tween:transform', that.dest);
      $.proxy(complete, that.elem)();
    }
  },
  
  // for ie
  fixOnCenter: function(matrix, inc) {
    var margin = { x: 0, y: 0 }, position = { x: 0, y: 0 };
    var arr = matrix.toArray();
    
    position.x += arr[4] + this.position.x;
    position.y += arr[5] + this.position.y;
    
    if (inc.scalex || inc.rotatey || inc.skewx) {
      margin.x = -(parseInt($(this.elem).width(), 10) - this.src.width) / 2;
    }
    
    if (inc.scaley || inc.rotatex || inc.skewy) {
      margin.y = -(parseInt($(this.elem).height(), 10) - this.src.height) / 2;
    }
    
    // center the transform origin, from pbakaus's Transformie http://github.com/pbakaus/transformie
    if (inc.rotatez) {
      margin.x = -(this.elem.offsetWidth / 2) + (this.elem.clientWidth / 2);
      margin.y = -(this.elem.offsetHeight / 2) + (this.elem.clientHeight / 2);
    }
    
    $(this.elem).css({
      left: sprintf('%spx', position.x),
      top: sprintf('%spx', position.y),
      marginLeft: sprintf('%spx', margin.x),
      marginTop: sprintf('%spx', margin.y)
    });
  }
}

function animate(elem, options) {
  new Animation(elem).animate(options.props, options.duration, options.easing, options.complete);
  $(elem).dequeue();
}