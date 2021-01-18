/* SITE JAVASCRIPT */

// Default value for search forms
$(window).load(function() {
	if ($("#q").DefaultValue || $("#pmq").DefaultValue) {

		$("body.error404 #pmq").DefaultValue("Search poets, poems, keywords...");
		$("body.error500 #pmq").DefaultValue("Search poets, poems, keywords...");

		$("#q").DefaultValue("Search poems, poets, videos...");
		$("#pmq").DefaultValue("poets, poems, keywords...");
	}
});

// Primary navigation dropdowns
$('div#navbar ul li ul.dropdown').live('mouseover mouseout', function(event) {
	if (event.type == 'mouseover')
		$(this).parent('li').addClass('hover');
	else
		$(this).parent('li').removeClass('hover');
});

function iOSNavFix() {
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
		$("div#navbar li.nb1, div#navbar li.nb2, div#navbar li.nb3, div#navbar li.nb4, div#navbar li.nb5").click(function(){
			var is_open = $(this).hasClass('hover');

			$('div#navbar li.nb1, div#navbar li.nb2, div#navbar li.nb3, div#navbar li.nb4, div#navbar li.nb5').removeClass('hover');
			if (!open) {
				$(this).addClass('hover');
			} else {
				$(this).removeClass('hover');
			}
	    });
	}
}

$(document).ready(function() {
	iOSNavFix();
});


// Show hover style for links when associated image for link is hovered	
$('ul.thumblist li a').live('mouseover mouseout', function(event) {
	if (event.type == 'mouseover')
		$(this).parent('li').find('a').addClass('hover');
	else
		$(this).parent('li').find('a').removeClass('hover');
});

/* FOR TABS ON POEM/POET AND FAVORITES */
$(document).ready(function() {
	if(typeof(enable_jquery_tabs) !== 'undefined') {
		/* Poem Page */
		$('div#tabs a.about').live('click', function() {
			$('div#poemwrapper span.birthyear').css('display', 'inline-block');
		});

		$('div#tabs a.poem').live('click', function() {
			$('div#poemwrapper span.birthyear').css('display', 'none');
		});
	
		$(window).bind( 'hashchange', function(e) {

			var selected_tab = $.param.fragment(),
				param_obj = $.bbq.getState(),
			    param_val = $.bbq.getState( 'param_name' ),
			    param_val_coerced = $.bbq.getState( 'param_name', true );
			if (selected_tab && $('div#'+selected_tab).length > 0) {
				$('div#tabs a').each(function(){
					if ($(this).hasClass('active')){
						$(this).removeClass('active');
						$('div#'+$(this).attr('class')+'-top.tab-content').hide();
						$('div#'+$(this).attr('class')+'.tab-content').hide();
					}
				});

				var selected_tab_link = $('div#tabs a.'+selected_tab);
				$('div#'+selected_tab+'-top.tab-content').show();
				$('div#'+selected_tab+'.tab-content').show();
				selected_tab_link.addClass('active');

    			$('html, body').animate( { scrollTop: 0 }, 0 );
				return false;
			}
		});
		$(window).trigger( 'hashchange' );
	}
});

/* ACTIONS */
$('div.title').live('mouseover mouseout', function(event){
		$(this).toggleClass('active');
});

$('div.actions a').live('mouseover mouseout', function(event){
		$(this).siblings('span.icon').toggleClass('active');
});

$('div.actions a.add-favorite-link, div.actions a.remove-favorite-link').live('mouseover mouseout', function(event){
    $(this).closest('span.favorite').siblings('span.icon').toggleClass('active');
});

/* EXPANDER WIDGET */
$(document).ready(function() {
	var location =  window.location.pathname;
	location = location.replace('/bio/', '');
	var expand = $.cookie('expand_'+location);
	if (expand == 1) {
		$('#more_poems').parent('span').hide();
		$('#more_poems').parents('div.expander').filter(':first').toggleClass('active');
		$("form.tag input.tag").DefaultValue("Tag this poem");
	}
});


$('div.expander ul.list a.toggle').live('click', function(){
	$(this).parent('span').hide();
});

$('div.expander a.toggle').live('click', function(){
	var expander_id =$(this).attr('id');
	if (typeof(expander_id) !== 'undefined' && expander_id=='more_poems') {
		var location =  window.location.pathname;
		location = location.replace('/bio/', '');
		$.cookie('expand_'+location, 1);
	};
	$(this).parents('div.expander').filter(':first').toggleClass('active');
	$("form.tag input.tag").DefaultValue("Tag this poem");
	return false;
});

/* ARTICLE PAGE */
$('div.tabs-comments a').live('click', function() {
	$('div#tabs a.comments').click();
	$('html, body').animate( { scrollTop: 0 }, 500 );	
	return false;
});

$('div.tabs-article a').live('click', function() {
	$('div#tabs a.article').click();
	$('html, body').animate( { scrollTop: 0 }, 500 );	
	return false;
});

$('a.backtotop').live('click', function() {
	$('html, body').animate( { scrollTop: 0 }, 500 );	
	return false;
});

/* NEWSLETTER SIGNUP BOX */

$('div#newsletterdefault a').live('click', function(){
	$('div#newsletterpop').toggle();
	return false;
})

$('a#newsletter_signup_cancel').live('click', function(){
	$('div#newsletterpop').hide();
	return false;
})
/* Footer */

$('div#footer form#signup input#snailmail, div#footer a.cancel').live('click', function(){
	$('form#signup div.mailing, form#signup p.email').toggle();

	if ($(this).is(':checked')){
		$('form#signup input#email_signup2').val($('form#signup input#email_signup1').val());
		$('form#signup input#email_signup2').attr('name', 'email');
		$('form#signup input#email_signup1').attr('name', 'email2');
	} else {
		$('form#signup input#snailmail').attr('checked', '');
		$('form#signup input#email_signup1').val($('form#signup input#email_signup2').val());
		$('form#signup input#email_signup1').attr('name', 'email');
		$('form#signup input#email_signup2').attr('name', 'email2');
	}

	$('div#footer div#links div.col').css('height', 'auto');
	CSSTable('div#footer div#links', 'div#footer div#links div.col', 3);

	if ($(this).hasClass('cancel'))
		return false;
});

/* ON LOAD */

$(document).ready(function(){

	$('form#signup input#email_signup1, form#signup input#email_signup2').DefaultValue('Enter your email address');
	$('form#signup input#signup_name').DefaultValue('Enter your name');
	$('form#signup input#signup_address_1').DefaultValue('Address');
	$('form#signup input#signup_address_2').DefaultValue('Address');
	$('form#signup input#signup_city').DefaultValue('City');
	$('form#signup input#signup_state').DefaultValue('State');
	$('form#signup input#signup_zip').DefaultValue('Zip');

	// Creating custom :external selector
	$.expr[':'].external = function(obj){
	    return !obj.href.match(/^mailto\:/)
	            && (obj.href != '')
	            && (obj.href != '#')
	            && (obj.hostname != location.hostname)
	            && (obj.hostname != 'www.poetryfoundation.org')
	            && (obj.hostname != 'poetryfoundation.org');
	};

	// Add 'extlink' CSS class to all external links
	$('div.authorbio a:external, div.credit a:external, div.style-e a:external, div.latestaudio a:external, div.eventright p a:external').each(function(){
		if (!$(this).hasClass('link'))
			$(this).addClass('more link extlink lpad');
	});

	$('a:external').each(function(){
		//--- Using an older version of jQuery that doesn't return undefined for non-existant attributes.
		nowtarget = $(this).attr("target");
		nowtarget_type = typeof(nowtarget);
		if( nowtarget_type == "undefined" || nowtarget == "" )
			$(this).attr({target: "_blank"});
	});
});

/* SITEWIDE FUNCTIONS */

function initializeTooltips() {
	if ($.isFunction($.fn.tooltip)) {
		$('span.icon.p').tooltip({ tip: "div#tooltip-p", position: "top right" });
		$('span.icon.l').tooltip({ tip: "div#tooltip-l", position: "top right" });
		$('span.icon.c').tooltip({ tip: "div#tooltip-c", position: "top right" });
		$('span.icon.v').tooltip({ tip: "div#tooltip-v", position: "top right" });
		$('span.icon.a').tooltip({ tip: "div#tooltip-a", position: "top right" });
	}
}

var CSSTable = function(parent_classname, child_classname, cols)
{
	var cols = cols;
	var pc = parent_classname;
	var cc = child_classname;
	var heights = new Array();
	var maxHeight = 0;
	var t = 0;
	var i = 1;
	var n = 0;

	$(cc).each(function(){
		t++;

		$(this).height('auto');

		if (maxHeight < $(this).height())
			maxHeight = $(this).height();

		if (i == cols || t == $(pc+" > "+cc).size())
		{
			heights[n] = maxHeight;
			maxHeight = 0;
			i = 1;
			n++;
		}
		else
			i++;
	});

	i = 1;
	n = 0;

	$(cc).each(function() {

		$(this).height(heights[n]);

		if (i == cols)
		{
			i = 1;
			n++;
		}
		else
			i++;
	});		
}

function truncateHTML(text, link_text, len)
{
	len = (len - link_text.length);	
	
	if (text.length > len) {
		text = text.substring(0, len);
		text = text.replace(/\w+$/, '');
		text = text+' ...';
	} 
	return text;
}

function getTextTout (section) {
	$.getJSON('/json/text_touts.json', function(data) {
		var all_data = data[section];
		var picked = all_data[Math.floor(Math.random() * all_data.length)];

		if (picked.twitter_feed === "0") {
			picked.text = truncateHTML(picked.text, picked.link_text, 155);
			$('#text_tout_text').html(picked.text);
			$('#text_tout_link_text').html(picked.link_text);
			$('#text_tout_link').attr('href', picked.link);
		} else {
			$.getScript("http://api.twitter.com/1/statuses/user_timeline/"+picked.twitter_user+".json?callback=twitter_callback_texttout&count=2", function(){});
		}
	});
}

function twitter_callback_texttout (twitters) {
	var status = twitters[0].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, 	function(url) {
      return '<a href="'+url+'">'+url+'</a>';
    }).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
      return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
    });
	
	$('#text_tout_text').html(status);
	$('#text_tout_link_text').html("Follow "+ twitters[0].user.name +" on Twitter");
	$('#text_tout_link').attr('href', "http://twitter.com/#!/"+twitters[0].user.screen_name);
}

function setup_google_book_links () {

    $('.book-image').show();

    for (i in isbns) {
        var isbn = isbns[i];
        var bookInfo = _GBSBookInfo[isbn];
        var buttonImg = '/images/google-books-logo.png';

        if (bookInfo) {
            var preview_url = bookInfo.preview_url;
            if (bookInfo.thumbnail_url) {
                var zoomed = bookInfo.thumbnail_url;
                zoomed = zoomed.replace('&edge=curl', '');
                zoomed = zoomed.replace('&zoom=5', '&zoom=1')
                $('#book_img_'+isbn).html('<img src="'+zoomed+'" class="left image" border="0" />');

                //larger image in tooltip
                zoomed = zoomed.replace('&zoom=5', '&zoom=1');
                $('#book_tip_'+isbn).html('<div class="booktipint"><img src="'+zoomed+'" /><p>Buy or borrow this book:</p><a href="'+preview_url+'"><img src="'+buttonImg+'" border="0" /></a><div class="clear"></div></div>');
                if ($.isFunction($.fn.tooltip)) {
                    $('#book_img_'+isbn).tooltip({ tip: "#book_tip_"+isbn, position: "top" });
                }
            }

            $('.book_url_'+isbn).attr('href', bookInfo.preview_url);
            $('.book_url_'+isbn).attr('href', preview_url);
        }

        else {
            $('.book_url_'+isbn).replaceWith(function() {
                var html = $.trim($(this).html());
                return '<span class="title">' + html + '</span>';
            });
        }
    }
}

// Adjust column heights (fix for IE)
$(document).ready(function() {

    var height = $('.latestaudio').height();

    $('.showinfo').height(100);
});


/**
 * jQuery Cookie plugin - https://github.com/carhartl/jquery-cookie
 *
 * Copyright (c) 2010 Klaus Hartl, @carhartl
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
(function(g){g.cookie=function(h,b,a){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(b))||b===null||b===undefined)){a=g.extend({},a);if(b===null||b===undefined)a.expires=-1;if(typeof a.expires==="number"){var d=a.expires,c=a.expires=new Date;c.setDate(c.getDate()+d)}b=String(b);return document.cookie=[encodeURIComponent(h),"=",a.raw?b:encodeURIComponent(b),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?
"; secure":""].join("")}a=b||{};d=a.raw?function(i){return i}:decodeURIComponent;c=document.cookie.split("; ");for(var e=0,f;f=c[e]&&c[e].split("=");e++)if(d(f[0])===h)return d(f[1]||"");return null}})(jQuery);
