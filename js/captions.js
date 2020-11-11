(function($) {
      $.fn.imageCaption = function(options) {
        var defaults = {
          figure: '<div>',
          figcaption: '<a>'
        };
        var options = $.extend(defaults, options);
        return this.each(function() {
          var o = $(this);
          var sauce = o.attr('data-src');
          var alt = o.attr('alt');
          var classes = o.attr('class');
          var caption = "<a href='" + sauce + "'>" + alt + "</a>";
          o
            .wrap(options.figure)
            .parent().addClass("img-container")
            .append(caption);
          if (o.hasClass("crop-none")){
            o.parent().addClass("neg-space");
          }
        });
      }
    })(jQuery);
    
    $('img').not('.fractal').imageCaption();