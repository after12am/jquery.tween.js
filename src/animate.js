var Animation = function(elem) {
  this.elem = elem;
  this.matrix = $(this.elem).data('tween:animate:matrix') || new DxImageMatrix();
  this.d;
  this.init();
}

// set default values
Animation.prototype.init = function() {
  if (this.d = $(this.elem).data('tween:animate:default')) return;
  $(this.elem).data('tween:animate:default', this.d = {
    x: parseInt($(this.elem).css('left'), 10) || 0,
    y: parseInt($(this.elem).css('top'), 10) || 0
  });
}

Animation.prototype.animate = function(props, options) {
  
  var transition = {
    left: isRelativeValue(props.x) ? props.x : props.x + this.d.x,
    top: isRelativeValue(props.y) ? props.y : props.y + this.d.y//,
    // m11: 1.0, 
    // m12: 0.0,
    // m21: 0.0, 
    // m22: 1.0,
  };
  
  
  for (var k in props) {
    switch (k) {
      case 'rotatez': transition['rotatez'] = props.rotatez - this.matrix.rotation; break;
    }
  }
  
  // add non transform properties
  // i.e. width, height, color ...
  for (var k in props) {
    if (this[k] === -1) transition[k] = props[k];
  }
  
  $(this.elem).animate($.extend(transition, { transform: 1 }), {
    duration: options.duration, 
    easing: options.easing, 
    complete: this.complete(options.props, options.complete),
    step: this.update()
  });
  
  $(this.elem).data('tween:animate:matrix', this.matrix);
}

Animation.prototype.complete = function(init, callback) {
  var that = this;
  return function() {
    that.matrix.rotation = init.rotatez;
    that.matrix.start = [
      that.matrix.end[0],
      that.matrix.end[1],
      that.matrix.end[2],
      that.matrix.end[3]
    ];
    $.proxy(callback, that.elem)();
    $(that.elem).dequeue();
  }
}

Animation.prototype.update = function() {
  var that = this;
  return function(value, init) {
    switch (init.prop) {
      case 'rotatez': that.matrix.rotateZ(value); break;
      case 'm11': break;
      case 'm12': break;
      case 'm21': break;
      case 'm22': break;
      case 'transform':
        var filter = [that.matrix.toString()].join(',')
        $(that.elem).css('filter', sprintf('progid:%s', filter));
        // center the transform origin, from pbakaus's Transformie http://github.com/pbakaus/transformie
				that.elem.style["marginLeft"] = -(that.elem.offsetWidth/2) + (that.elem.clientWidth/2) + "px";
				that.elem.style["marginTop"] = -(that.elem.offsetHeight/2) + (that.elem.clientHeight/2) + "px";
        break;
    }
  }
}

function animate(options) {
  return function() {
    new Animation(this).animate(options.props, options);
    $(this).dequeue();
  }
}