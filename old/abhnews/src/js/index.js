var ABHNews = ABHNews || {};
ABHNews.HomePage = ABHNews.HomePage || {};
ABHNews.HomePage = (function(){
  var fn, config;
  // 
  config = {
    newsRssUrl: "https://api.rss2json.com/v1/api.json?rss_url=http://rss.jagran.com/rss/news/national.xml",
    newsDetailLink: "/old/newsdetail.html"
  }
  fn = {
    init: function(){
      fn.showNewsFromNewsData();
      fn.bindEvents();
    },
    bindEvents: function(){
      
    },
    showNewsFromNewsData: function(url, ct){
      fn.getLocalNewsData("./news/tickernews/data.json", fn.showTickerNews);
      fn.getLocalNewsData("./news/mainnews/data.json", fn.showMainNews);
      fn.getLocalNewsData("./news/breakingnews/data.json", fn.showBreakingNews);
      fn.getLocalNewsData("./news/bignews/data.json", fn.showBigNews);
      fn.getLocalNewsData("./news/abhspecialnews/data.json", fn.showABHSpecialNews);
      fn.getLocalNewsData("./news/ajabnews/data.json", fn.showAjabNews);
      fn.getLocalNewsData("./news/localnews/data.json", fn.showLocalNews);
      fn.getLocalNewsData("./news/chatpatinews/data.json", fn.showChatpatiNews);
      fn.showFreshNews();
      fn.getLocalNewsData("./news/editors/data.json",fn.showEditors);
    },
    getLocalNewsData: function(url, cb){
      $.ajax({
        url: url,
        success: function(data){
          if(typeof(cb) == 'function'){
            cb(data);
          }
        },
        error: function(data){
          if(data.status == "200"){
            data = JSON.parse(data.responseText);
            if(typeof(cb) == 'function'){
              cb(data);
            }
          }
          console.log(data);
        }
      });
    },

    showMainNews: function(newsData){
      var bigNews = $(".big-news"), item;
      item = newsData.news.items[newsData.news.items.length-1];
      bigNews.find(".news-img").attr("src",item.image); 
      bigNews.find(".news-title").text(item.title);
      bigNews.find(".detail-news").html(item.description);
      bigNews.find(".publish-date").text(item.pubDate);
      bigNews.find(".news-detail-link").attr("href", "/old/newsdetail.html?id="+item.id+"&newstype="+newsData.news.type);
    },
    showTickerNews: function(newsData){
      var data = newsData.news, htm, item;
      var newsCt = $(".ticker-news");
      item = data.items[data.items.length-1];
      htm="<a href="+ config.newsDetailLink +"?id="+item.id+"&newstype="+data.type + "><div>Breaking News: " +item.title + "</div></a>";
      newsCt.append(htm);
      newsCt.bxSlider({
        ticker: true,
        speed: 10000,
        tickerHover: true
      });
    },
    showBreakingNews: function(newsData){
      var data = newsData.news;
      var newsCt = $(".bxslider-2");
      for(var key in data.items){
        var item = data.items[key];
        var tpl = $($("#breaking-news-headline-tpl").html());
        tpl.find(".news-img").attr("src",item.image); 
        tpl.find(".news-title").text(item.title);
        tpl.find(".detail-news").html(item.description);
        tpl.find(".news-detail-link").attr("href", config.newsDetailLink + "?id="+item.id+"&newstype="+data.type);
        tpl.find(".news-detail-link").attr("data-newsid", item.id);
        tpl.find(".news-detail-link").attr("data-newstype", data.type);
        tpl.find(".publish-date").text(item.pubDate);
        newsCt.append(tpl);
      }
      newsCt.bxSlider({
        mode: "vertical",
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 550,
        slideMargin: 15,
        moveSlides: 1,
        controls: true,
        auto: true,
        pause: 7000,
        infiniteLoop: false,
        pager: false,
        hideControlOnEnd: true
      });
    },

    showBigNews: function(newsData){
      var data = newsData.news;
      var newsCt = $(".bxslider-3");
      for(var key in data.items){
        var item = data.items[key];
        var tpl = $($("#news-headline-tpl").html());
        tpl.find(".news-img").attr("src",item.image); 
        tpl.find(".news-title").text(item.title);
        tpl.find(".detail-news").html(item.description);
        tpl.find(".news-detail-link").attr("href", config.newsDetailLink + "?id="+item.id+"&newstype="+data.type);
        tpl.find(".publish-date").text(item.pubDate);
        tpl.find(".news-detail-link").attr("data-newsid", item.id);
        tpl.find(".news-detail-link").attr("data-newstype", data.type);
        newsCt.append(tpl);
      }
      newsCt.bxSlider({
        mode: 'horizontal',
        minSlides: 2,
        maxSlides: 7,
        slideWidth: 200,
        slideMargin: 10,
        moveSlides: 1,
        controls: true,
        adaptiveHeight: true,
        infiniteLoop: false,
        pager: false,
        hideControlOnEnd: true,
        prevText: '<i class="fa fa-arrow-circle-o-right"></i>'
        // ticker: true
        // auto: true,
        // pause: 6500
      });
    },
    showABHSpecialNews: function(newsData){
      var data = newsData.news, count=0, len, maxShow=0;
      var newsCt = $(".abh-special-ct");
      len = data.items.length;
      maxShow = len%3;

      for(count=len-1;count>=maxShow;count--){
        var item = data.items[count];
        var tpl = $($("#abh-special-tpl").html());
        tpl.find(".news-img").attr("src",item.image); 
        tpl.find(".news-title").text(item.title);
        tpl.find(".news-detail-link").attr("href", config.newsDetailLink + "?id="+item.id+"&newstype="+data.type);
        tpl.find(".publish-date").text(item.pubDate);
        tpl.find(".news-detail-link").attr("data-newsid", item.id);
        tpl.find(".news-detail-link").attr("data-newstype", data.type);
        newsCt.append(tpl);
      }
    },
    showAjabNews: function(newsData){
      var data = newsData.news;
      var newsCt = $(".bxslider-7");
      for(var key in data.items){
        var item = data.items[key];
        var tpl = $($("#news-headline-tpl").html());
        tpl.find(".news-img").attr("src",item.image); 
        tpl.find(".news-title").text(item.title);
        tpl.find(".detail-news").html(item.description);
        tpl.find(".news-detail-link").attr("href", config.newsDetailLink + "?id="+item.id+"&newstype="+data.type);
        tpl.find(".publish-date").text(item.pubDate);
        tpl.find(".news-detail-link").attr("data-newsid", item.id);
        tpl.find(".news-detail-link").attr("data-newstype", data.type);
        newsCt.append(tpl);
      }
      newsCt.bxSlider({
        minSlides: 2,
        maxSlides: 7,
        slideWidth: 200,
        slideMargin: 10,
        moveSlides: 1,
        controls: true,
        adaptiveHeight: true,
        infiniteLoop: false,
        pager: false,
        hideControlOnEnd: true
        // auto: true,
        // pause: 7500
      });
    },
    showLocalNews: function(newsData){
      var data = newsData.news;
      var newsCt = $(".bxslider-8");
      for(var key in data.items){
        var item = data.items[key];
        var tpl = $($("#news-headline-tpl").html());
        tpl.find(".news-img").attr("src",item.image); 
        tpl.find(".news-title").text(item.title);
        tpl.find(".detail-news").html(item.description);
        tpl.find(".news-detail-link").attr("href", config.newsDetailLink + "?id="+item.id+"&newstype="+data.type);
        tpl.find(".publish-date").text(item.pubDate);
        tpl.find(".news-detail-link").attr("data-newsid", item.id);
        tpl.find(".news-detail-link").attr("data-newstype", data.type);
        newsCt.append(tpl);
      }
      newsCt.bxSlider({
        minSlides: 2,
        maxSlides: 7,
        slideWidth: 200,
        slideMargin: 10,
        moveSlides: 1,
        controls: true,
        adaptiveHeight: true,
        infiniteLoop: false,
        pager: false,
        hideControlOnEnd: true
        // auto: true,
        // pause: 7000
      });
    },
    showChatpatiNews: function(newsData){
      var data = newsData.news;
      var newsCt = $(".bxslider-9");
      for(var key in data.items){
        var item = data.items[key];
        var tpl = $($("#news-headline-tpl").html());
        tpl.find(".news-img").attr("src",item.image); 
        tpl.find(".news-title").text(item.title);
        tpl.find(".detail-news").html(item.description);
        tpl.find(".news-detail-link").attr("href", config.newsDetailLink + "?id="+item.id+"&newstype="+data.type);
        tpl.find(".publish-date").text(item.pubDate);
        tpl.find(".news-detail-link").attr("data-newsid", item.id);
        tpl.find(".news-detail-link").attr("data-newstype", data.type);
        newsCt.append(tpl);
      }
      newsCt.bxSlider({
        minSlides: 2,
        maxSlides: 7,
        slideWidth: 200,
        slideMargin: 10,
        moveSlides: 1,
        controls: true,
        adaptiveHeight: true,
        infiniteLoop: false,
        pager: false,
        hideControlOnEnd: true
        // auto: true,
        // pause: 7500
      });
    },
    showEditors: function(newsData){
      var data = newsData.news;
      var newsCt = $(".bxslider-5");
      for(var key in data.items){
        var item = data.items[key];
        var tpl = $($("#editors-tpl").html());
        tpl.find(".member-img").attr("src",item.image);
        tpl.find(".member-name").text(item.name);
        tpl.find(".member-desig").html(item.designation);
        tpl.find(".profile-link").attr("href",item.profileLink);
        newsCt.append(tpl);
      }

      newsCt.bxSlider({
        minSlides: 2,
        maxSlides: 7,
        slideWidth: 150,
        slideMargin: 35,
        moveSlides: 1,
        controls: true,
        auto: true,
        pause: 7500,
        autoHover: true,
        pager: false,
      });
    },

    showFreshNews: function(){
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
              tpl.find(".news-title").text(item.title);
              tpl.find(".detail-news").html(item.content);
              tpl.find(".publish-date").text(item.pubDate);
              sliderCt.append(tpl);
            }
          }
          
          $('.bxslider-4').bxSlider({
            minSlides: 2,
            maxSlides: 7,
            slideWidth: 150,
            slideMargin: 15,
            moveSlides: 1,
            controls: true,
            infiniteLoop: false,
            pager: false,
            hideControlOnEnd: true
          });
          $(".bxslider-4 li").on("click", function(){
            var heading, content, news;
            news = this;
            heading = $(news).find(".news-title").text();
            content = $(news).find(".detail-news").html();
            fn.showNewsModal(heading, content);
            return false;
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
  ABHNews.HomePage.init();
});