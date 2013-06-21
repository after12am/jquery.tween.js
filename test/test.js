/*
© 2011, Rico Sta. Cruz. Released under the MIT License.

jQuery Transit is authored and maintained by Rico Sta. Cruz with help from it's contributors. It is sponsored by my startup, Sinefunc, Inc.
*/
(function($) {
  /* Simple test framework of sorts */
  $('.test').live('mouseenter play', function() {
    var $test = $(this).closest('.test');
    $test.trigger('reset');
    var $box = $test.find('.box:not(.ghost)');
    var $ghost = $box.clone().addClass('ghost').appendTo($test.find('.area'));

    $test.data('code').fn($box, $test);
  });

  $('.test').live('mouseleave reset', function() {
    var $test = $(this).closest('.test');
    var $ghost = $test.find('.ghost');
    if ($ghost.length) {
      $test.find('.box:not(.ghost)').remove();
      $test.find('.ghost').removeClass('ghost');
    }
  }); 

  $('.play-all').live('click', function() {
    $('.test').trigger('play');
  });
  
  var group_name = 'not_specified';

  function test(name, fn) {
    var i = $('.tests .test').length;
    var $test = $('<div class="test"><h3></h3><div class="area"><div class="box"></div></div><pre class="code"></pre></div>');

    var m = fn.toString().match(/\{([\s\S]*)\}$/);
    var code = m[1];
    code = code.replace(/^\s*|\s*$/g, '');
    code = code.replace(/\n {4}/g, "\n");
    name = name.replace(/\(.*\)/, function(n) { return "<em>"+n.substr(1,n.length-2)+"</em>"; });

    $test.attr('id', 'test-'+i);
    $test.addClass('group-'+group_name);
    $test.find('h3').html(name);
    $test.find('pre').text(code);
    $test.data('code', {fn: fn});

    $('.tests').append($test);
  }

  function group(name) {
    group_name = name.toLowerCase();
    $('.tests').append($('<h4 class="group-heading">').text(name));
    var e = $('<input type="button">')
        .addClass('play')
        .addClass('play-'+name.toLowerCase())
        .attr('value', 'play all');
    $('.tests').append(e);
    
  }

  // Show versions
  $(function() {
    $('#jquery-version').html(
      'jQuery: v' + $.fn.jquery + '<br>'
    );
  });

  window.group = group;
  window.test  = test;

})(jQuery);
