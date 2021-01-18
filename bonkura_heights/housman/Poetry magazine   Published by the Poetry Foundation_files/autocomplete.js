/**
 * autocomplete.js
 *
 * Contains a jquery extension (allowing HTML in jQuery Autocomplete items) and code that utilizes it.
 *
 *
 */



/*
* jQuery UI Autocomplete HTML Extension
*
* Copyright 2010, Scott González (http://scottgonzalez.com)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* http://github.com/scottgonzalez/jquery-ui-extensions
*/
(function( $ ) {

    var proto = $.ui.autocomplete.prototype,
    initSource = proto._initSource;

    function filter( array, term ) {
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
        return $.grep( array, function(value) {
            return matcher.test( $( "<div>" ).html( value.label || value.value || value ).text() );
        });
    }

    $.extend( proto, {
        _initSource: function() {
            if ( this.options.html && $.isArray(this.options.source) ) {
                this.source = function( request, response ) {
                    response( filter( this.options.source, request.term ) );
                };
            } else {
                initSource.call( this );
            }
        },

        _renderItem: function( ul, item) {
            return $( "<li></li>" )
                .data( "item.autocomplete", item )
                .append( $( "<a></a>" )[ this.options.html ? "html" : "text" ]( item.label ) )
                .appendTo( ul );
        }

    });

})( jQuery );

//=====================================================================================

var decodeEntities = (function() {
    // this prevents any overhead from creating the object each time
    var element = $('<div>');

    function decodeHTMLEntities (str) {
        if(str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.html(str);
            str = element.text();
            element.text('');
        }

        return str;
    }

    return decodeHTMLEntities;
})();

jQuery(function($){

    $("#q").autocomplete({
        source: '/search/autocomplete',
        select: function(event, ui) {
            $("#q").val(decodeEntities(ui.item.value));
            $(this).parents("form").submit();
            event.preventDefault();
        },
        html: true
    });

})
