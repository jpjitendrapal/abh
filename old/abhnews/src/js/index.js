var ABHNews = ABHNews || {};
ABHNews = (function(){
  var fn, config;

  config = {
    newsRssUrl: "https://api.rss2json.com/v1/api.json?rss_url=http://rss.jagran.com/rss/news/national.xml"
  }
  fn = {
    init: function(){
      fn.showNewsFromNewsData();
      fn.getOnlineNews();
      fn.bindEvents();
    },
    bindEvents: function(){
      $(".bxslider-3 li").on("click", function(){
        var heading, content, news;
        news = this;
        heading = $(news).find(".news-heading h4").text();
        content = "<img src='"+ $(news).find("img").attr("src") +"'>" + $(news).find(".detail-news").text();
        fn.showNewsModal(heading, content);
      });
      $(".bxslider-2 li").on("click", function(){
        var heading, content, news;
        news = this;
        heading = $(news).find(".news-title").text();
        content = "<img src='"+ $(news).find("img").attr("src") +"'>" + $(news).find(".detail-news").text();
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
    showNewsFromNewsData: function(){
      // show breaking news section
      var newsData;
      
      // $.ajax({
      //   url: "file:///Users/jitendra/Documents/jitendra/github/abh/news/breakingnews/newsData.json",
      //   success: function(data){
      //     console.log(data);
      //     newsData = data;
      //   },
      //   error: function(data){
      //     console.log(data);
      //   }
      // });
      newsData = {
        "news": {
            "type": "breaking",
            "items": [
                {
                    "id": 1,
                    "title": "Ev Rama Swami Periyar Jyanti",
                    "pubDate": "2017-09-15 09:41:57",
                    "image": "./news/breakingnews/img/news1.jpg",
                    "description": "Ev Rama Swami Periyar Jyanti VIP road fatehpur"
                },
                {
                    "id": 2,
                    "title": "ऑस्ट्रेलिया के खिलाफ 17 सितंबर से शुरू हो रही पांच मैचों की वन-डे सीरीज",
                    "pubDate": "2017-09-15 09:41:57",
                    "image": "./news/breakingnews/img/news2.jpg",
                    "description": "ऑस्ट्रेलिया के खिलाफ 17 सितंबर से शुरू हो रही पांच मैचों की वन-डे सीरीज के पहले तीन मैचों के लिए रविवार को 16 सदस्यीय भारतीय टीम की घोषणा कर दी गई है ऑस्ट्रेलिया के खिलाफ पहले तीन वन-डे के‌ लिए टीम इंडिया का ऐलान, शमी-यादव की वापसी"
                },
                {
                    "id": 3,
                    "title": "लखनऊ के जुल्फिकार बना रहे 110 फीट ऊंचा मोदी का कटआउट",
                    "pubDate": "2017-09-15 09:41:57",
                    "image": "./news/breakingnews/img/news3.jpg",
                    "description": "लखनऊ के जुल्फिकार बना रहे 110 फीट ऊंचा मोदी का कटआउट"
                },
                {
                    "id": 4,
                    "title": "नवरात्रि की तैयारियां तेज, मंदिरों में गूंजेंगे मैया के जयकारे",
                    "pubDate": "2017-09-15 09:41:57",
                    "image": "./news/breakingnews/img/news4.jpg",
                    "description": "उरई। 21 सितंबर से नवरात्रि का शुभारंभ हो रहा है। पर्व को देखते हुए तैयारियां भी जोरों से की जा रही है। वहीं, शहर के प्रमुख मंदिरों में भी साफ सफाई व सजावट का दौर शुरू हो गया है। मंदिरों की साफ सफाई के बाद मैया का दरबार सजाया गया। शनिवार से देवी मंदिरों में मैया के जयकारे गूंजेगे। वहीं, घरों में भी महिलाएं तैयारी में व्यस्त रहीं। बाजारों में भी नवरात्र शुरू होने को लेकर खासी चहल, पहल शुरू हो गई है।"
                }
            ] 
        }
    };

    
    fn.showBreakingNews(newsData, ".bxslider-2")


    },
    showBreakingNews: function(newsData, ct){
      var data = newsData.news;
      var newsCt = $(ct);
      for(var key in data.items){
        var item = data.items[key];
        var tpl = $($("#breaking-news-headline-tpl").html());
        tpl.find(".news-img").attr("src",item.image); 
        tpl.find(".news-title").text(item.title);
        tpl.find(".detail-news").html(item.description);
        newsCt.append(tpl);
      }
    },

    getOnlineNews: function(){
      var url, headline, sliderCt;
      url = config.newsRssUrl;
      headline = $(".bxslider-4-ct .onlineNews");
      sliderCt = $(".bxslider-4");
      $.ajax({
        url: url,
        success: function(data){
          if(data.status == "ok"){
            for(var key in data.items){
              var item = data.items[key];
              var tpl = $($("#news-headline-tpl").html());
              tpl.find(".news-img").attr("src",$(item.description).attr("src")); 
              // tpl.find(".news-link").attr("href", item.link);
              tpl.find(".headline").text(item.title);
              tpl.find(".detail-news").html(item.content);
              sliderCt.append(tpl);
            }
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
    showNewsModal: function(heading, content, config){
      var newsModal;
      newsModal = $("#newsDescModal");
      newsModal.find(".modal-title").html(heading);
      newsModal.find(".modal-body").html(content);
      newsModal.modal("show");
      if(config){

      }
    }
  }
  return fn;
})();


$(document).ready(function(){
  ABHNews.init();
});