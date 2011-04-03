/*
	jMasterPage.js
	
	Author: Stefan Espindola Mielke
	Date: 2 April 2011
*/
(function( $ ){

  var methods = {
    ajusteLinks : function(url){
        $("a").removeClass('jmsInactive').addClass('jmsActive')
          .each(function() {
            if ($(this).attr("href") == url) {
              $(this).addClass('jmsInactive').removeClass('jmsActive');
              return false;
            }
          });
    },
    callPage : function( url, object ) {
      methods.ajusteLinks(url);
      $.ajax({
        url: url,
        success: function(html){
          object.html(html);
        },
        error: function() {
          object.html('Erro ao carregar a página ' + url);
        }
      });
    },
    init : function( options ) {
      var settings = {
        home : ''
      };
      
      return this.each(function() {
        if ( options ) { 
          $.extend( settings, options );
        }
        
        $this = $(this);

        // Ajustando o click
        $("a").live('click', function() {
          if (!$(this).hasClass('jmsInactive')) {
            $("a").removeClass('jmsInactive').addClass('jmsActive');
            $(this).addClass('jmsInactive').removeClass('jmsActive');
            var url = $(this).attr('href');
            methods.callPage(url, $this);
            methods.callPage(url, $this);
          }
          return false;
        })
        
        if (settings.home != '') {
          methods.callPage(settings.home, $this);
        }

      });
    }
  };

  $.fn.jmasterpage = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    }
    else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    }
    else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.jmasterpage' );
    }    
  
  };

})( jQuery );