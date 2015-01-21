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

        //parallax
        ph = $(window).height();
        mph = $(window).scrollTop()/ph;
        nph = mph*(ph*0.3);

        if($(document).scrollTop() < ph) {
        	$('.parallax').css('margin-top','-'+nph+'px');
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

	pressSwiper = $('.press-swiper-container').swiper({
		//Your options here:
		loop: true,
		mode:'horizontal',
		calculateHeight: true,
		slidesPerViewFit: true,
		autoplay: 3000
		//etc..
	});

	mySwiper = $('.swiper-container').swiper({
		//Your options here:
		loop: true,
		mode:'horizontal',
		calculateHeight: true,
		slidesPerViewFit: true,
		pagination: '.pagination',
		paginationClickable: true
		//etc..
	});

	$('.swiper-prev').on('click',function(e){
		e.preventDefault();

		mySwiper.swipePrev();
	});

	$('.swiper-next').on('click',function(e){
		e.preventDefault();

		mySwiper.swipeNext();
	});

	$('.fade-in').addClass('on');

	//hamburger
	$('.js-hamburger').on('click', function(){
		if( $(this).hasClass('active') ){
			$(this).removeClass('active');
			$('.js-hamburger-nav').removeClass('active');
		} else {
			$(this).addClass('active');
			$('.js-hamburger-nav').addClass('active');
		}
	})

	//Onresize
	$(window).resize(function() {
		//resizeHero();
		resizeDesc();
		resizeSwiper();
	});

	//resizeHero
	function resizeHero() {
		if( $(window).width() < 768 ){
			height = $('.js-min-height-img').height();
			width = $('.js-min-height-img').width();

			nw = (width*430)/height;
			$('.js-min-height-img').width(nw);
		} else {
			$('.js-min-height-img').width('100%');
		}
	}

	function resizeDesc() {
		width = $('.team-cont .item').width();
		height = $('.team-cont .item').height();
		count = (width/13) * ((height-32-67-50)/13);

		if(height == 0){
		} else {
			$.each( $('.team-cont .item .abs p'), function( key, value ) {
				if( $(this).data('copy') == undefined ){
					copy = $(this).text().substr(0,count);
					$(this).data('copy',copy);
					$(this).text( copy+'...' );
				} else {
					copy = $(this).data('copy');
					copy = copy.substr(0,count);
					$(this).text( copy+'...' );
				}
			});
		}
	}

	function resizeSwiper() {
		if( $(window).width() < 768 ){
			height = $('.swiper-slide img').height();
			$('.swiper-prev').css('top',(height/2)+'px');
			$('.swiper-next').css('top',(height/2)+'px');
		}
	}
	


	$(window).load(function() {
		//resizeHero();
		resizeDesc();
		resizeSwiper();
	});

});