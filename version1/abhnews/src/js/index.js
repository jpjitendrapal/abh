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

  $('.bxslider-5').bxSlider({
    minSlides: 2,
    maxSlides: 4,
    slideWidth: 280,
    slideMargin: 5,
    moveSlides: 1,
    controls: true,
    auto: true,
    pause: 5000
  });
  
  function getOnlineNews(){
    var url, headline, newsTpl, sliderCt;
    url = "https://api.rss2json.com/v1/api.json?rss_url=http://rss.jagran.com/rss/news/national.xml";
    headline = $(".bxslider-4-ct .onlineNews");
    newsTpl = $($("#news-headline-tpl").html());
    sliderCt = $(".bxslider-4");
    $.ajax({
      url: url,
      success: function(data){
        if(data.status == "ok"){
          // headline.text(data.feed.description);
        }
        // var len = data.items.length;
        for(key in data.items){
          var item = data.items[key];
          var tpl = $($("#news-headline-tpl").html());
          tpl.find(".news-img").attr("src",$(item.description).attr("src")); 
          tpl.find(".news-link").attr("href", item.link);
          tpl.find(".headline").text(item.title);
          sliderCt.append(tpl);
        }
        $('.bxslider-4').bxSlider({
          minSlides: 2,
          maxSlides: 4,
          slideWidth: 280,
          slideMargin: 5,
          moveSlides: 1,
          controls: true,
          auto: true,
          pause: 5000
        });
      },
      error: function(error){
        console.log(error);
      }

    });
  }
  getOnlineNews();
});