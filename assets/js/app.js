$(function(){
	mobile = 480;
	tablet = 767;

	screenWidth = $(window).width();
	scroll_top = $(window).scrollTop();
	scrollCont = $('.js-scroll-nav-cont');
	pin = $('.js-pin');

	// Console function
	// Simpler way to console and checks if console exists first
	function o(msg){
		if( window.console ){
			console.log(msg);
		}
	}

	// Js Twitter 
	$('.js-twitter-share').on('click', function(e){
		e.preventDefault();
		var loc = $(this).attr('href');
		var title  = escape($(this).attr('title'));

		window.open('http://twitter.com/share?url=' + loc + '&text=' + title + '&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
		return false;
	});

	$('body').on('click', '.js-fb-share', function(e){
		e.preventDefault();

		url = encodeURIComponent(location.href);
		if( $(this).attr('title').length ){
			url = escape($(this).attr('title'));
		}

		window.open('https://www.facebook.com/sharer/sharer.php?u='+url , 'fbwindow', 'height=300, width=750, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

		return false;
	});

	// Pin nav
	// Makes an element fixed once we scroll past it, 
	// triggered by "On Scroll"
	// --------------------------------------------------------------------------------------------------------- Pin Nav
	if($(pin).length) {
		sticky_navigation_offset_top = $(pin).offset().top;
	}
	function pinNav(pinObj) {
	    if (scroll_top > sticky_navigation_offset_top + 0  ) { 
			pinObj.addClass('fixed');
		} else {
			pinObj.removeClass('fixed');
		}   
	}

	// Check nav and adjust active
	// Adjusts navigation to make element you are on as active
	// triggered by "On Scroll"
	// --------------------------------------------------------------------------------------------------------- Check nav and adjust active
	function checkNavPos() {
		scroll_top = $(window).scrollTop();
	    fromBottom = $(document).height() - Math.abs(($(window).scrollTop()) + $(window).height());

	    $('.js-scroll-nav-item').each(function (i) {
	    	if ($(this).offset().top <= (scroll_top) + $('.header').height() ) {
	            $(pin).find('.js-scroll-nav-cont li a.active').removeClass('active');
	            $(pin).find('.js-scroll-nav-cont li:eq('+i+') a').addClass('active');
	        }
	    });
	}

	// Force scroll to trigger for certain browsers
	$(window).scroll();

	// Scroll to nav
	// When Click on navigation element will scroll to matching id 
	if($(scrollCont).length) {
		$(scrollCont).find('a[href*=#]:not([href=#])').on('click', function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {

			  var target = $(this.hash);
			  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			  $(pin).find('.js-scroll-nav-cont a').removeClass('active');
			  $(this).addClass('active');
			  $(scrollCont).addClass('action');

			  if (target.length) {
				$('html,body').animate({
			    	scrollTop: target.offset().top-$('.js-pin').height()
			    }, 700, 'swing', function() {
			    	$(scrollCont).removeClass('action');
			    });	
			    return false;
			  }
			}
		});
	}

	// On Scroll
	// --------------------------------------------------------------------------------------------------------- On Scroll
	$(window).scroll(function() {
		scroll_top = $(window).scrollTop();

		if($(pin).length && screenWidth > mobile) {
	    	pinNav(pin);
	    }

	    if($(pin).length) {
	    	if( !$(scrollCont).hasClass('action') ){
		    	checkNavPos();
		    }
	    }

	    if($(document).scrollTop() > 100) {
            $(".nav-cont").addClass("scrolled");
        } else {
            $(".nav-cont").removeClass("scrolled");
        }

	});
	if($(pin).length && screenWidth > mobile) {
		pinNav(pin);
	}

	// Scroll to values
	$('.js-scroll-to-values').on('click', function(e) {
		e.preventDefault();

		$('html,body').animate({
	    	scrollTop: $('.values-cont').offset().top-$('.js-pin').height()
	    }, 700, 'swing', function() {
	    	$(scrollCont).removeClass('action');
	    });	

	    return false;

	});

});