var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-4659065-1']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    
    $('#slideprev').click(function(){
        _gaq.push(['_trackEvent', 'Widget', 'Previous', '']);
    });
    
    $('#slidenext').click(function(){
        _gaq.push(['_trackEvent', 'Widget', 'Next', '']);
    });


    $("#widget-nav-slider ul li").click( function(){
        var action = 'Jump';

        //--- Determine the two panels on either side of the selected. If either is current, then this was effectively a Previous / Next click.
        $prev = $(this).prev();
        if( $prev.length == 0 ) $prev = $(this).siblings().last();

        $next = $(this).next();
        if( $next.length == 0 ) $next = $(this).siblings().first();

        if( $prev.is(".current-page") ) action = "Next";
        if( $next.is(".current-page") ) action = "Previous";

        _gaq.push(['_trackEvent', 'Widget', action, '']);
    });

    //--- Track More links (but not if they're also Random links)
    $(".widget-content a.more.link").click(function(){
        if( $(this).is(".random") ) return;

        targetHref = $(this).attr('href');
        _gaq.push(['_trackEvent', 'Widget', 'Read More', targetHref ]);
    });

    //--- Track "load new random poem" links
    $(".widget-content a.more.link.random").click(function(){
        _gaq.push(['_trackEvent', 'Widget', 'Random', '' ]);
    });

    //--- Track links toother pages (but not if they're tracked above)
    $(".widget-content a").click(function(){
        if( $(this).is(".more.link") ) return;

        targetHref = $(this).attr('href');
        _gaq.push(['_trackEvent', 'Widget', 'Click', targetHref ]);
    });

})();