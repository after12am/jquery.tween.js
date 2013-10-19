var unit = (function($) {
  
  var $root = $('.tests');
  
  return {
    
    useButton: false,
    
    moduleName: '',
    
    animationType: '',
    
    _innerContent: function(func) {
      var m = func.match(/function\s*\(.*\)\s*{\s([\s\S]*)\s*}/);
      return m[1].replace(/,\s(complete|callback)/, '');
    },
    
    _click: function(e) {
      var module = $(e.target).attr('data-module-name');
      var $tests = $('.test.'+module);
      $tests.mouseout();
      setTimeout(function() {
        $tests.mouseover();
      }, 10);
      return false;
    },
    
    _mouseover: function() {
      var $test = $(this);
      var $box = $test.find('.box');
      var $ghost = $('<div>').addClass('box ghost');
      $box.parent().prepend($ghost);
      
      /* -webkit-transform (rotateX, rotateY) causes z-index to be ignored on safari */
      if ($test.hasClass('rotatex') || $test.hasClass('rotatey')) {
        $ghost.tween({ z: -1000 }, 0);
      }
      
      $.fn.tween.debug.animateType = $test.data('debug.animationType');
      $test.data('code')($box);
      return false;
    },
    
    _mouseout: function() {
      var $box = $('<div>').addClass('box');
      var $test = $(this);
      $test.find('.box').remove();
      $test.find('.area').append($box);
      $box.parent().find('box.ghost').remove();
      return false;
    },
    
    module: function(text) {
      this.moduleName = text;
      $root.append($('<h2>').addClass('head').text(text));
      if (this.useButton) {
        $btn = $('<button>').addClass('btn').attr('data-module-name', text).text('click');
        $btn.click(this._click);
        $root.append($btn);
      }
      return this;
    },
    
    type: function(type) {
      switch (type) {
        case 'animation':
        case 'transition': this.animationType = type; break;
      }
      return this;
    },
    
    test: function(description, func) {
      var $h3   = $('<h3>').text(description);
      var $test = $('<div>').addClass('test ' + description + ' ' + this.moduleName);
      var $area = $('<div>').addClass('area');
      var $box = $('<div>').addClass('box');
      var $pre  = $('<pre>').addClass('code').text(this._innerContent(func.toString()));
      
      $test.data('debug.animationType', this.animationType);
      $area.append($box);
      $test.append($h3).append($area).append($pre);
      $test.mouseover(this._mouseover);
      $test.mouseout(this._mouseout);
      $test.data('code', func).data('description', description);
      
      $root.append($test);
      return this;
    }
  };
})($);