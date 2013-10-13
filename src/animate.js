var Animation = function(elem) {
  this.elem = elem;
  this.dxImage = $(this.elem).data('tween:animate:dxImage') || new DxImage();
  this.d; // default values
}

Animation.prototype.animate = function(props, options) {
  
  if (!(this.d = $(this.elem).data('tween:animate:default'))) {
    $(this.elem).data('tween:animate:default', this.d = {
      x: parseInt($(this.elem).css('left'), 10) || 0,
      y: parseInt($(this.elem).css('top'), 10) || 0
    });
  }
  
  this.dxImage.size(
    parseInt($(this.elem).width(), 10),
    parseInt($(this.elem).height(), 10)
  );
  
  var transition = {};
  
  for (var k in props) {
    console.log(k)
    switch (k) {
      case 'rotatez': transition['rotatez'] = props.rotatez - this.dxImage.rotation; break;
      case 'scalex': transition['scalex'] = props.scalex - this.dxImage.scalex; break;
      case 'scaley': transition['scaley'] = props.scaley - this.dxImage.scaley; break;
      case 'skewx': transition['skewx'] = props.skewx - this.dxImage.skewx; break;
      case 'skewy': transition['skewy'] = props.skewy - this.dxImage.skewy; break;
      case 'x': transition['left'] = isRelativeValue(props.x) ? props.x : props.x + this.d.x; break;
      case 'y':  transition['top'] = isRelativeValue(props.y) ? props.y : props.y + this.d.y; break;
    }
  }
  
  // add non transform properties
  // e.g. width, height, color ...
  for (var k in props) {
    if (this[k] === -1) transition[k] = props[k];
  }
  
  $(this.elem).animate($.extend(transition, { /*transform: 1*/ }), {
    duration: options.duration, 
    easing: options.easing, 
    complete: this.complete(options.props, options.complete),
    step: this.update()
  });
  
  $(this.elem).data('tween:animate:dxImage', this.dxImage);
}

Animation.prototype.complete = function(init, callback) {
  var that = this;
  return function() {
    for (var k in init) {
      switch (k) {
        case 'rotatez': that.dxImage.rotation = init.rotatez; break;
        case 'scalex': that.dxImage.scalex = init.scalex; break;
        case 'scaley': that.dxImage.scaley = init.scaley; break;
        case 'skewx': that.dxImage.skewx = init.skewx; break;
        case 'skewy': that.dxImage.skewy = init.skewy; break;
      }
    }
    $.proxy(callback, that.elem)();
    $(that.elem).dequeue();
  }
}

Animation.prototype.update = function() {
  var that = this;
  return function(value, init) {
    switch (init.prop) {
      case 'rotatez':
        that.dxImage.rotateZ(value);
        $(that.elem).css('filter', sprintf('progid:%s', that.dxImage.toString()));
        // center the transform origin, from pbakaus's Transformie http://github.com/pbakaus/transformie
        that.elem.style["marginLeft"] = -(that.elem.offsetWidth/2) + (that.elem.clientWidth/2) + "px";
        that.elem.style["marginTop"] = -(that.elem.offsetHeight/2) + (that.elem.clientHeight/2) + "px";
        break;
      case 'scalex':
        that.dxImage.scaleX(value);
        $(that.elem).css('filter', sprintf('progid:%s', that.dxImage.toString()));
        that.elem.style["marginLeft"] = -(parseInt($(that.elem).width(), 10) - that.dxImage.width) / 2 + "px";
        break;
      case 'scaley':
        that.dxImage.scaleY(value);
        $(that.elem).css('filter', sprintf('progid:%s', that.dxImage.toString()));
        that.elem.style["marginTop"] = -(parseInt($(that.elem).height(), 10) - that.dxImage.height) / 2 + "px";
        break;
      case 'skewx':
        that.dxImage.skewX(value);
        $(that.elem).css('filter', sprintf('progid:%s', that.dxImage.toString()));
        that.elem.style["marginLeft"] = -(parseInt($(that.elem).width(), 10) - that.dxImage.width) / 2 + "px";
        break;
      case 'skewy':
        that.dxImage.skewY(value);
        $(that.elem).css('filter', sprintf('progid:%s', that.dxImage.toString()));
        that.elem.style["marginTop"] = -(parseInt($(that.elem).height(), 10) - that.dxImage.height) / 2 + "px";
        break;
      // case 'transform':
      //   var filter = [that.dxImage.toString()].join(',')
      //   $(that.elem).css('filter', sprintf('progid:%s', filter));
      //   // center the transform origin, from pbakaus's Transformie http://github.com/pbakaus/transformie
      //   that.elem.style["marginLeft"] = -(that.elem.offsetWidth/2) + (that.elem.clientWidth/2) + "px";
      //   that.elem.style["marginTop"] = -(that.elem.offsetHeight/2) + (that.elem.clientHeight/2) + "px";
      //   break;
    }
  }
}

function animate(options) {
  return function() {
    new Animation(this).animate(options.props, options);
    $(this).dequeue();
  }
}