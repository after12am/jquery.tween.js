function IEfixture() {
  this.x = 0;
  this.y = 0;
  this.rotatex = null;
  this.rotatey = null;
  this.rotatez = 0;
  this.scalex = 0;
  this.scaley = 0;
  this.skewx = 0;
  this.skewy = 0;
}

IEfixture.prototype = {
  // fix on center for ie
  center: function(animation) {
    var margin = { x: 0, y: 0 }, position = { x: 0, y: 0 };
    var arr = animation.matrix.toArray();
    
    position.x += arr[4] + animation.def.x;
    position.y += arr[5] + animation.def.y;
    
    if (this.scalex || this.rotatey || this.skewx) {
      margin.x = -(parseInt($(animation.elem).width(), 10) - animation.src.width) / 2;
    }
    
    if (this.scaley || this.rotatex || this.skewy) {
      margin.y = -(parseInt($(animation.elem).height(), 10) - animation.src.height) / 2;
    }
    
    // center the transform origin, from pbakaus's Transformie http://github.com/pbakaus/transformie
    if (this.rotatez) {
      margin.x = -(animation.elem.offsetWidth / 2) + (animation.elem.clientWidth / 2);
      margin.y = -(animation.elem.offsetHeight / 2) + (animation.elem.clientHeight / 2);
    }
    
    $(animation.elem).css({
      left: sprintf('%spx', position.x),
      top: sprintf('%spx', position.y),
      marginLeft: sprintf('%spx', margin.x),
      marginTop: sprintf('%spx', margin.y)
    });
  }
}

function Animation(elem) {
  this.elem = elem;
  this.src = $(elem).data('tween:transform') || Transform.factory();
  this.dest = Transform.factory();
  this.matrix = new Matrix();
  this.def = (function() {
    return {
      x: $(elem).data('tween:def.x') || $(elem).data('tween:def.x', parseInt($(elem).css('left'), 10) || 0).data('tween:def.x'),
      y: $(elem).data('tween:def.y') || $(elem).data('tween:def.y', parseInt($(elem).css('top'), 10) || 0).data('tween:def.y')
    }
  })();
}

Animation.prototype = {
  
  set: function(k, v) {
    var style = this.elem.style;
    var name = vendorPropName(style, k);
    $(this.elem).css(name, v);
    return this;
  },
  
  get: function(k) {
    var style = this.elem.style;
    var name = vendorPropName(style, k);
    return $(this.elem).css(name);
  },
  
  transform: function(matrix) {
    var arr = matrix.toArray();
    for (var i = 0; i < arr.length; i++) arr[i] = round(arr[i]);
    this.set('transform', sprintf('matrix(%s,%s,%s,%s,%s,%s)',
      arr[0],
      arr[1],
      arr[2],
      arr[3],
      arr[4],
      arr[5]
    ));
  },
  
  dxImageTransform: function(matrix) {
    var arr = matrix.toArray();
    for (var i = 0; i < arr.length; i++) arr[i] = round(arr[i]);
    this.set('filter', sprintf("progid:DXImageTransform.Microsoft.Matrix(M11=%s, M12=%s, M21=%s, M22=%s,sizingMethod='auto expand');",
      arr[0],
      arr[2],
      arr[1],
      arr[3]
    ));
  },
  
  animate: function(props, duration, delay, easing, complete) {
    
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
    
    $(this.elem).delay(delay).animate($.extend(transition, { ___update: true }), {
      duration: duration, 
      easing: easing, 
      complete: this.complete(this, complete),
      step: this.update(this, new IEfixture())
    });
    
    $(this.elem).dequeue();
  },
  
  update: function(that, fixture) {
    return function(value, init) {
      var k = init.prop.replace(/__/, '');
      if (k in that.src) fixture[k] = value;
      if (k === '_update') return;
      
      that.matrix = new Matrix();
      
      that.matrix = that.matrix.translate({
        x: fixture.x + that.src.x,
        y: fixture.y + that.src.y
      });
      
      that.matrix = that.matrix.rotate(degToRad(fixture.rotatez + that.src.rotatez));
      
      // rotatex and rotatey is important more than scale
      // so we use scale for rotating on XY-axis.
      if (fixture.rotatex !== null || fixture.rotatey !== null) {
        that.matrix = that.matrix.scale({
          x: Math.cos(degToRad((fixture.rotatey || 0) + that.src.rotatey)),
          y: Math.cos(degToRad((fixture.rotatex || 0) + that.src.rotatex))
        });
      } else {
        that.matrix = that.matrix.scale({
          x: fixture.scalex + that.src.scalex,
          y: fixture.scaley + that.src.scaley
        });
      }
      
      that.matrix = that.matrix.skew({
        x: degToRad(fixture.skewx + that.src.skewx),
        y: degToRad(fixture.skewy + that.src.skewy)
      });
      
      // set transition style
      if (isIE) {
        that.dxImageTransform(that.matrix);
        fixture.center(that);
      } else {
        that.transform(that.matrix);
      }
    }
  },
  
  complete: function(that, complete) {
    return function() {
      $(that.elem).data('tween:transform', that.dest);
      $.proxy(complete, that.elem)();
    }
  }
}

function animate(elem, options) {
  new Animation(elem).animate(
    options.props, 
    options.duration, 
    options.delay, 
    options.easing, 
    options.complete
  );
}