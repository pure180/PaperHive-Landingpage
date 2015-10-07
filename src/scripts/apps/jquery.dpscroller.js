/* ========================================================================
 * DpScroller: jQuery.dpscroller.js v1.0.1
 * Author: Daniel Pfisterer (info@daniel-pfisterer.de)
 * ========================================================================
 * Copyright 2015-2015 Ventzke Media
 *
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 * ======================================================================== */

+function ($) {
  'use strict';

  var DpScroller = function(element, options) {
    this.$element       = $(element)
    this.data           = this.$element.data()
    this.options        = $.extend({}, DpScroller.DEFAULTS, this.data, options)

    this.pos            = $(window).scrollTop()
    this.start          = this.offsetTop()
    this.end            = this.offsetBottom()

    //$('.inidcator.top').css('top', this.start )
    //$('.inidcator.bottom').css('top', this.end )

    this.Init()
  }
  DpScroller.VERSION  = '1.0.2'

  DpScroller.DEFAULTS = {
    beforeClass       : 'scroller_before',
    whileClass        : 'scroller_while',
    afterClass        : 'scroller_after',
    triggerStart      : 0,
    triggerEnd        : 0
  }

  DpScroller.prototype.Init = function() {
    var scrolled = null

    if(this.pos >= this.start && this.pos <= this.end ) {
      scrolled = 'inside'
      this.Inside();
    } else if ( this.pos >= this.end ) {
      scrolled = 'after'
      this.After();
    } else if ( this.pos <= this.start ) {
      scrolled = 'before'
      this.Before();
    } else {
      //console.log('else: ' + scroll_pos)
    }

    var eventType = scrolled
    var e = $.Event(eventType + '.dp.scroller')
    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return
  }

  DpScroller.prototype.Position = function() {
    var percent_scroll_position
    var percent = (this.pos - this.start) / (this.end - this.start)
    if( this.options.scrollerReverse ) {
      percent_scroll_position = this.options.scrollerStart - ( percent * (this.options.scrollerStart-this.options.scrollerEnd) * this.options.scrollerFaktor)
    } else {
      percent_scroll_position = this.options.scrollerStart + ( percent * this.options.scrollerEnd * this.options.scrollerFaktor) - this.options.scrollerStart
    }
    return percent_scroll_position
  }

  DpScroller.prototype.Inside = function() {

    this.$element.one()
      .addClass(this.options.whileClass)
      .removeClass(this.options.beforeClass)
      .removeClass(this.options.afterClass)
    if(this.options.scrollerStyle) {
      this.$element.css(this.options.scrollerStyle, this.Position() );
    }
  }

  DpScroller.prototype.Before = function() {

    this.$element.one()
      .removeClass(this.options.whileClass)
      .addClass(this.options.beforeClass)

    if(this.options.scrollerStyle) {
      this.$element.css(this.options.scrollerStyle, this.options.scrollerStart * this.options.scrollerFaktor );
    }
  }

  DpScroller.prototype.After = function() {
    this.$element.one()
      .removeClass(this.options.whileClass)
      .addClass(this.options.afterClass)

    if(this.options.scrollerStyle){
      this.$element.css(this.options.scrollerStyle, this.options.scrollerEnd * this.options.scrollerFaktor);
    }
  }

  DpScroller.prototype.offsetTop = function() {
    var trigger = this.options.triggerStart
    var offsetTop
    if(trigger){
      offsetTop = typeof trigger === 'number' ? trigger :  $(trigger).offset().top
    } else {
      offsetTop = typeof this.options.triggerStart === 'number' ? this.options.triggerStart :  this.$element.offset().top
    }
    return offsetTop;
  }

  DpScroller.prototype.offsetBottom = function() {
    var trigger = this.options.triggerEnd
    var offsetBottom
    if(trigger){
      offsetBottom = typeof trigger === 'number' ? trigger : $(trigger).offset().top
    } else {
      offsetBottom = typeof this.options.triggerEnd === 'number' ? this.options.triggerEnd : this.$element.offset().top
    }
    return offsetBottom;
  }

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('dp.scroller')
      var options = $.extend({}, DpScroller.DEFAULTS, data, option)
      new DpScroller($this, options)
    })
  }

  var old = $.fn.dpscroller

  $.fn.dpscroller             = Plugin
  $.fn.dpscroller.Constructor = DpScroller

  $.fn.dpscroller.noConflict = function () {
    $.fn.dpscroller = old
    return this
  }


  $(window).on('load, scroll.dp.scroller.data-api', function() {
    $('[data-spy="scroller"]').each(function(){
      var $spy = $(this)
      var data = $spy.data()
      Plugin.call($spy, data)
    })
  });

}(jQuery);
