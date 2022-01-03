(function ($) {
  $(document).ready(function () {
    "use strict";



    // MOBILE MENU
	  $('.side-navigation ul li a').on('click', function (e) {
        $(this).parent().children('.side-navigation ul li ul').toggle();
        return true;
      });



    // TOOLTIP
    $('[data-toggle="tooltip"]').tooltip()


    // SLIDER
    var swiper = new Swiper('.slider-container', {
      touchRatio: 0,
      loop: true,
      speed: 600,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
      },
    });


    // CONTENT SLIDER
    var swiper = new Swiper('.content-slider', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });


    // PARALLAX
    $.stellar({
      horizontalScrolling: false,
      verticalOffset: 0,
      responsive: true
    });


    // PAGE TRANSITION
    $('body a').on('click', function (e) {
      var target = $(this).attr('target');
      var fancybox = $(this).data('fancybox');
      var url = this.getAttribute("href");
      if (target != '_blank' && typeof fancybox == 'undefined' && url.indexOf('#') < 0) {


        e.preventDefault();
        var url = this.getAttribute("href");
        if (url.indexOf('#') != -1) {
          var hash = url.substring(url.indexOf('#'));


          if ($('body ' + hash).length != 0) {
            $('.transition-overlay').removeClass("active");


          }
        } else {
          $('.transition-overlay').toggleClass("active");
          setTimeout(function () {
            window.location = url;
          }, 1300);

        }
      }
    });


    // HAMBURGER
    $('.hamburger').on('click', function (e) {
      $(this).toggleClass('open');
      $('body').toggleClass('overflow');
      $('.side-navigation').toggleClass('active');
    });


    // DATA BACKGROUND IMAGE
    var pageSection = $("*");
    pageSection.each(function (indx) {
      if ($(this).attr("data-background")) {
        $(this).css("background-image", "url(" + $(this).data("background") + ")");
      }
    });


  });
  // END JQUERY	


  // MASONRY
  $(window).load(function () {
    $('.photo-gallery').isotope({
      itemSelector: '.gallery li',
      percentPosition: true
    });
  });


  // ISOTOPE FILTER
  var $container = $('.photo-gallery');
  $container.isotope({
    filter: '*',
    animationOptions: {
      duration: 750,
      easing: 'linear',
      queue: false
    }
  });

  $('.gallery-filter li a').click(function () {
    $('.gallery-filter li a.current').removeClass('current');
    $(this).addClass('current');

    var selector = $(this).attr('data-filter');
    $container.isotope({
      filter: selector,
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
      }
    });
    return false;
  });


  // COUNTER
  $(document).scroll(function () {
    $('.odometer').each(function () {
      var parent_section_postion = $(this).closest('section').position();
      var parent_section_top = parent_section_postion.top;
      if ($(document).scrollTop() > parent_section_top - 300) {
        if ($(this).data('status') == 'yes') {
          $(this).html($(this).data('count'));
          $(this).data('status', 'no')
        }
      }
    });
  });


  // WOW ANIMATION 
  wow = new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 100, // default
    mobile: true, // default
    live: true // default
  })
  wow.init();


  // PRELOADER
  $(window).load(function () {
    $("body").addClass("page-loaded");
  });

})(jQuery);
