/* FUNCTIONS */
var magazineAutoSwitch = function() {
	var $active = $('div#slidenav a.active');

	if ( $active.length == 0 )
		$active = $('div#slidenav a:first');

	var $next = $active.next().length ? $active.next() : $('div#slidenav a:first');
	
	magazineSlideSwitch($next);
}


var magazineSlideSwitch = function(el) {

	var container = $('div#featuredslideshow');
	
	if((!container.is(':animated')) ) {

		var oldslide = $(el).siblings('.active').attr('id');
		var curslide = $(el).attr('id');

		if (oldslide == undefined)
			oldslide = curslide;

		// Highlight pagination
		$(el).siblings('.active').removeClass('active');
		$(el).addClass('active');

		$('div#featuredslideshow div.item').fadeOut(200);
		$('div#featuredslideshow div.'+curslide).fadeIn(400);
	}
	
	return false;
	
};

var toggleTimer = function(magazinePlaySlideshow, clicked, showpause) {

	if (magazinePlaySlideshow !== false)
	{
		if (showpause !== false)
			$('div#slidecontrols a').removeClass('active');

		clearInterval(magazinePlaySlideshow);
		magazinePlaySlideshow = false;
	}
	else
	{
		if (showpause !== false)
			$('div#slidecontrols a').addClass('active');

		if (clicked == true)
			magazineAutoSwitch();

  		magazinePlaySlideshow = setInterval( "magazineAutoSwitch()", 10000 );
	}

	return magazinePlaySlideshow;
}

/* ACTIONS */

// Automate slideshow
$(document).ready(function() {
	magazinePlaySlideshow = false;
	magazinePlaySlideshow = toggleTimer(magazinePlaySlideshow, false, true);
});

// Move to selected pane on click
$("div#slidenav a").live("click", function() {
	$('div#slidecontrols a,div#slidenav a').removeClass('active');
	clearInterval(magazinePlaySlideshow);
	magazinePlaySlideshow = false;
	magazineSlideSwitch(this);
	$(this).addClass('active');
	return magazinePlaySlideshow;
});

// Handle Play/Pause button click
$('div#slidecontrols a').live("click", function() {
	magazinePlaySlideshow = toggleTimer(magazinePlaySlideshow, true, true);
	return false;
});

// Pause slideshow while mouse is over it
$('div#featuredslideshow').live('mouseover mouseout', function(event) {
	magazinePlaySlideshow = toggleTimer(magazinePlaySlideshow, false, false);
});

