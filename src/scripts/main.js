+(function(){
  "use strict";
  +function ($) {
    $(window).on('sm_min-above.triggerresize', function(){
      var winHeight = $(window).height()
      var winWidth = $(window).width()
      $('[data-type="fullsize"]').each(function(){
        $(this).one().css({
          'height': winHeight,
          'width': winWidth
        })
      })
      $('[data-type="position"]').each(function(){
        var eleHeight = $(this).outerHeight(true)
        var elePos = winHeight / 2 - eleHeight / 2
        $(this).css({
          'top': elePos
        })
      })
    })
  }(jQuery);

    var winHeight = $(window).height()
    var winWidth = $(window).width()
    if (winWidth <= 767){
      $('[data-type="fullsize"]').each(function(){
        $(this).one().css({
          'height': winHeight,
          'width': winWidth
        })
      })
      $('[data-type="position"]').each(function(){
        var eleHeight = $(this).outerHeight(true)
        var elePos = winHeight / 2 - eleHeight / 2
        $(this).css({
          'top': elePos
        })
      })
    }

  $(document).ready(function() {

    setTimeout(function(){
        $('body').delay(600).removeClass('preload-loading');
        $('.preload').fadeOut(600).delay(600).addClass('loaded');

    }, 3000);

  });

})();
