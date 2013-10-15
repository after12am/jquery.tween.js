var unit = (function($) {
  
  var $root = $('.tests');
  
  return {
    
    _innerContent: function(func) {
      var m = func.match(/function\s*\(.*\)\s*{\s([\s\S]*)\s*}/);
      return m[1].replace(/,\s(complete|callback)/, '');
    },
    
    module: function(text) {
      $root.append($('<h2>').addClass('head').text(text));
      return this;
    },
    
    test: function(description, func) {
      var $h3   = $('<h3>').text(description);
      var $test = $('<div>').addClass('test');
      var $area = $('<div>').addClass('area');
      var $box = $('<div>').addClass('box');
      var $pre  = $('<pre>').addClass('code').text(this._innerContent(func.toString()));
      
      $area.append($box);
      $test.append($h3).append($area).append($pre);
      $test.mouseover(this.mouseover);
      $test.mouseout(this.mouseout);
      $test.data('code', func).data('description', description);
      
      $root.append($test);
      return this;
    },
    
    mouseover: function() {
      var $test = $(this);
      var $box = $test.find('.box');
      $box.parent().append($('<div>').addClass('box ghost'));
      //$.proxy($test.data('code'), $box)();
      $test.data('code')($box);
      return false;
    },
    
    mouseout: function() {
      var $box = $('<div>').addClass('box');
      var $test = $(this);
      $test.find('.box').remove();
      $test.find('.area').append($box);
      $box.parent().find('box.ghost').remove();
      return false;
    }
  };
})($);