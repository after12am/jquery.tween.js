var unit = (function($) {
  
  var $root = $('.tests');
  
  return {
    
    _innerContent: function(func) {
      var m = func.match(/function\s*\(.*\)\s*{\s([\s\S]*)\s*}/);
      return m[1].replace(/,\s(complete|callback)/, '');
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
      
      //$.proxy($test.data('code'), $box)();
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
      $root.append($('<h2>').addClass('head').text(text));
      return this;
    },
    
    test: function(description, func) {
      var $h3   = $('<h3>').text(description);
      var $test = $('<div>').addClass('test ' + description);
      var $area = $('<div>').addClass('area');
      var $box = $('<div>').addClass('box');
      var $pre  = $('<pre>').addClass('code').text(this._innerContent(func.toString()));
      
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