var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-4659065-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

	var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;

    $('a[href]').each(function(){
        var href = $(this).attr('href');
        if ((href.match(/^https?\:/i)) && (!href.match(document.domain))){
            $(this).click(function() {
                var extLink = href.replace(/^https?\:\/\//i, '');
                _gaq.push(['_trackEvent', 'External', 'Click', extLink]);
            });
        }
        else if (href.match(/^mailto\:/i)){
            $(this).click(function() {
                var mailLink = href.replace(/^mailto\:/i, '');
                _gaq.push(['_trackEvent', 'Email', 'Click', mailLink]);
            });
        }
        else if (href.match(filetypes)){
            $(this).click(function() {
                var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
                var filePath = href.replace(/^https?\:\/\/(www.)poetryfoundation\.org\//i, '');
                _gaq.push(['_trackEvent', 'Download', 'Click - ' + extension, filePath]);
            });
        }
    });
	
	$('#footer_signup').click(function(){
		_gaq.push(['_trackEvent', 'form_submit', 'Click', 'newsletter_footer']);
	});
	$('#newsletter_main_submit').click(function(){
		_gaq.push(['_trackEvent', 'form_submit', 'Click', 'newsletter_submit']);
	});
	
})();