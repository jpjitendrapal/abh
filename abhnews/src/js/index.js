$(document).ready(function(){
  $('.bxslider-1').bxSlider({
    minSlides: 1,
    maxSlides: 5,
    slideWidth: 210,
    slideMargin: 5,
    moveSlides: 1,
    startSlide: 4,
    nextSelector: '#bx1-next',
    prevSelector: '#bx1-prev',
    nextText: '<img src="./abhnews/src/img/right.png" />',
    prevText: '<img src="./abhnews/src/img/left.png" />',
    pager: false,
    auto: true,
    pause: 6000
  });

  $('.bxslider-2').bxSlider({
    mode: "vertical",
    minSlides: 3,
    maxSlides: 3,
    slideWidth: 550,
    slideMargin: 15,
    moveSlides: 1,
    controls: false,
    auto: true,
    pause: 4000
  });

  $('.bxslider-3').bxSlider({
    minSlides: 2,
    maxSlides: 4,
    slideWidth: 280,
    slideMargin: 5,
    moveSlides: 1,
    controls: true,
    auto: true,
    pause: 5000
  });
});