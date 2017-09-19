var ABHNews = ABHNews || {};
ABHNews = (function(){
  var fn, config;

  config = {
    newsRssUrl: "https://api.rss2json.com/v1/api.json?rss_url=http://rss.jagran.com/rss/news/national.xml"
  }
  fn = {
    init: function(){
      fn.getOnlineNews();
      fn.bindEvents();
    },
    bindEvents: function(){
      $(".bxslider-3 li").on("click", function(){
        var heading, content, news;
        news = this;
        heading = $(news).find(".news-heading h4").text();
        content = "<img style='width:100%;' src='"+ $(news).find("img").attr("src") +"'>" + $(news).find(".detail-news").text();
        fn.showNewsModal(heading, content);
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
        pause: 5500
      });
    
      $('.bxslider-5').bxSlider({
        minSlides: 2,
        maxSlides: 4,
        slideWidth: 280,
        slideMargin: 5,
        moveSlides: 1,
        controls: true,
        auto: true,
        pause: 4000
      });
      $('.bxslider-6').bxSlider({
        minSlides: 2,
        maxSlides: 4,
        slideWidth: 280,
        slideMargin: 5,
        moveSlides: 1,
        controls: true,
        auto: true,
        pause: 6000
      });
    },
    getOnlineNews: function(){
      var url, headline, newsTpl, sliderCt;
      url = config.newsRssUrl;
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
            // tpl.find(".news-link").attr("href", item.link);
            tpl.find(".headline").text(item.title);
            tpl.find(".detail-news").html(item.content);
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
          $(".bxslider-4 li").on("click", function(){
            var heading, content, news;
            news = this;
            heading = $(news).find(".headline").text();
            content = $(news).find(".detail-news").html();
            fn.showNewsModal(heading, content);
          });
        },
        error: function(error){
          console.log(error);
        }
  
      });
    },
    showNewsModal: function(heading, content){
      var newsModal;
      newsModal = $("#newsDescModal");
      newsModal.find(".modal-title").html(heading);
      newsModal.find(".modal-body").html(content);
      newsModal.modal("show");
    }
  }
  return fn;
})();


$(document).ready(function(){
  ABHNews.init();
});