var ABHNews = ABHNews || {};
ABHNews.HomePage = ABHNews.HomePage || {};
ABHNews.HomePage = (function () {
  var fn, config;
  config = {
    jagranNewsRssUrl: "https://api.rss2json.com/v1/api.json?rss_url=http://rss.jagran.com/rss/news/national.xml",
    bhaskarInternationalRss: "https://api.rss2json.com/v1/api.json?rss_url=https://www.bhaskar.com/rss-feed/2338/",
    newsDetailLink: "/newsdetail.html",
    bxSliderConfig: {
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
    },
    allSectionsMapping: {},
    sectionOpened: ["tickernews", "abhspecialnews","mainnews","breakingnews"]
  }
  fn = {
    init: function () {
      fn.showNewsFromNewsData();
      fn.getMapping();
      fn.bindEvents();
    },
    getMapping: function(){
      config.allSectionsMapping = {
        "tickernews":  { el: ".ticker-news", f: fn.showTickerNews}
        ,"abhspecialnews": {el: ".abh-special-ct", f: fn.showABHSpecialNews}
        ,"mainnews": {el: ".big-news", f: fn.showMainNews}
        ,"breakingnews": {el: ".bxslider-2", f: fn.showBreakingNews}
        ,"bignews": {el: ".bxslider-3", f: fn.showBigNews}
        ,"freshnews": {el: ".bxslider-4", f: fn.showFreshNews}
        ,"ajabnews": {el: ".bxslider-7", f: fn.showAjabNews}
        ,"localnews": {el: ".bxslider-8", f: fn.showLocalNews}
        ,"gudgudinews": {el: ".gudgudi-ct", f: fn.showGudgudiNews}
        ,"chatpatinews": {el: ".bxslider-9", f: fn.showChatpatiNews}
        ,"inspirationalstories": {el: ".inspirational-stroies", f: fn.showInspirationalStories}
        ,"international": {el: ".intl-ct", f: fn.showInternationalNews}
      }
    },
    bindEvents: function () {
      $(window).on("scroll", function(){
        fn.lazyLoadNews();
       });
    },
    lazyLoadNews: function(){
    	for(var key in config.allSectionsMapping){
        if(config.sectionOpened.indexOf(key) == -1 &&  ABHNews.CommonUtils.elementInViewport($(config.allSectionsMapping[key].el)[0])){
          if(key == "freshnews" || key == "international"){
            fn.showOnlineNews(key);
          } else {
            fn.getLocalNewsData(key, config.allSectionsMapping[key].f);
          }
          config.sectionOpened.push(key);
        }
      }
    },
    showNewsFromNewsData: function () {
      fn.getLocalNewsData("tickernews", fn.showTickerNews);
      fn.getLocalNewsData("abhspecialnews", fn.showABHSpecialNews);
      fn.getLocalNewsData("mainnews", fn.showMainNews);
      fn.getLocalNewsData("breakingnews", fn.showBreakingNews);
      
    },

    
    getLocalNewsData: function (url, cb) {
      var fullUrl;
      fullUrl = "./news/"+url+"/data.json";
      $.ajax({
        url: fullUrl,
        success: function (data) {
          if (typeof (cb) == 'function') {
            cb(data);
          }
        },
        error: function (data) {
          if (data.status == "200") {
            data = JSON.parse(data.responseText);
            if (typeof (cb) == 'function') {
              cb(data);
            }
          }
          console.log(data);
        }
      });
    },
    showTickerNews: function (newsData) {
      var data = newsData.news, htm, item;
      var newsCt = $(".ticker-news");
      item = data.items[data.items.length - 1];
      htm = "<a href=" + config.newsDetailLink + "?id=" + item.id + "&newstype=" + data.type + "><div>Breaking News: " + item.title + "</div></a>";
      newsCt.append(htm);
      newsCt.bxSlider({
        ticker: true,
        speed: 12000,
        tickerHover: true
      });
    },
    showABHSpecialNews: function (newsData) {
      var data = newsData.news, count = 0, len, maxShow = 0, not10 = 0;
      var newsCt = $(".abh-special-ct");
      len = data.items.length;
      maxShow = len % 3;
      for (count = len - 1; count >= maxShow; count--) {
        var item = data.items[count];
        var tpl = $($("#abh-special-tpl").html());
        tpl.find(".news-img").attr("src", ABHNews.CommonUtils.getImageUrl(newsData.news.type, item.image));
        tpl.find(".news-title").html(item.title);
        tpl.find(".news-detail-link").attr("href", config.newsDetailLink + "?id=" + item.id + "&newstype=" + newsData.news.type);
        tpl.find(".publish-date").html(item.pubDate);
        tpl.find(".news-detail-link").attr("data-newsid", item.id);
        tpl.find(".news-detail-link").attr("data-newstype", newsData.news.type);
        newsCt.append(tpl);
        not10++;
        if(not10 == 9){
          break;
        }
      }
    },
    showMainNews: function (newsData) {
      var bigNews = $(".big-news"), item;
      item = newsData.news.items[newsData.news.items.length - 1];
      bigNews.find(".news-img").attr("src", ABHNews.CommonUtils.getImageUrl(newsData.news.type, item.image));
      bigNews.find(".news-title").html(item.title);
      bigNews.find(".detail-news").html(item.description);
      bigNews.find(".publish-date").html(item.pubDate);
      bigNews.find(".news-detail-link").attr("href", config.newsDetailLink + "?id=" + item.id + "&newstype=" + newsData.news.type);
    },
    
    showBreakingNews: function (newsData) {
      var data = newsData.news.items, len,newsCt, key, maxNews;
      len = data.length;
      newsCt = $(".bxslider-2");
      maxNews = ABHNews.CommonUtils.getMaxNewsCount(len);
      for (key=len-1; key>=maxNews; key--) {
        var item = data[key];
        var tpl = $($("#breaking-news-headline-tpl").html());
        tpl.find(".news-img").attr("src", ABHNews.CommonUtils.getImageUrl(newsData.news.type, item.image));
        tpl.find(".news-title").html(item.title);
        tpl.find(".news-detail-link").attr("href", config.newsDetailLink + "?id=" + item.id + "&newstype=" + newsData.news.type);
        tpl.find(".news-detail-link").attr("data-newsid", item.id);
        tpl.find(".news-detail-link").attr("data-newstype", newsData.news.type);
        tpl.find(".publish-date").html(item.pubDate);
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
    
    showGudgudiNews: function (newsData) {
      var data = newsData.news, count = 0, len, maxShow = 0, not10=0;
      var newsCt = $(".gudgudi-ct");
      len = data.items.length;
      maxShow = len % 3;
      for (count = len - 1; count >= maxShow; count--) {
        var item = data.items[count];
        var tpl = $($("#gudgudi-tpl").html());
        tpl.find(".news-title").html(item.title);
        tpl.find(".news-detail-link").attr("href", config.newsDetailLink + "?id=" + item.id + "&newstype=" + newsData.news.type);
        tpl.find(".publish-date").html(item.pubDate);
        tpl.find(".news-detail-link").attr("data-newsid", item.id);
        tpl.find(".news-detail-link").attr("data-newstype", newsData.news.type);
        newsCt.append(tpl);
        not10++;
        if(not10 == 9){
          break;
        }
      }
    },

    showBigNews: function (newsData) {
      fn.showNews(newsData);
    },
    showAjabNews: function (newsData) {
      fn.showNews(newsData);
    },
    showLocalNews: function (newsData) {
      fn.showNews(newsData);
    },
    showChatpatiNews: function (newsData) {
      fn.showNews(newsData);
    },

    showInspirationalStories: function (newsData) {
      var data = newsData.news.items, len, key, newsCt, maxNews;
      newsCt = $(".inspirational-stroies");
      len = data.length;
      maxNews = ABHNews.CommonUtils.getMaxNewsCount(len);
      for (key=len-1; key>=maxNews; key--) {
        var item = data[key];
        var tpl = $($("#inspirational-stroies-tpl").html());
        tpl.find(".story-title").html(item.title);
        tpl.find(".publish-date").html(item.pubDate);
        tpl.find(".story-detail").html(item.description);
        tpl.find(".news-detail-link").attr("href", config.newsDetailLink + "?id=" + item.id + "&newstype=" + newsData.news.type);
        tpl.find(".news-detail-link").attr("data-newsid", item.id);
        tpl.find(".news-detail-link").attr("data-newstype", newsData.news.type);
        newsCt.append(tpl);
      }

      config.bxSliderConfig.slideWidth = 250;
      newsCt.bxSlider(config.bxSliderConfig);
    },
    
    showOnlineNews: function (type) {
      var url, headline, sliderCt;
      
      if(type == "international"){
        headline = $(".intl-ct .onlineNews");
        sliderCt = $(".intl-news");
        url = config.bhaskarInternationalRss;
      } else if(type == "freshnews") {
        headline = $(".bxslider-4-ct .onlineNews");
        sliderCt = $(".bxslider-4");
        url = config.jagranNewsRssUrl;
      }
      $.ajax({
        url: url,
        beforeSend: function(){
          sliderCt.find(".loader").removeClass("hidden");
        },
        success: function (data) {
          if (data.status == "ok") {
            var len, maxShow, key, item, tpl;
            len = data.items.length;
            if(len > 3){
              maxShow = len % 3;
            }
            for (key=len-1; key >= maxShow;key--) {
              item = data.items[key];
              tpl = $($("#online-news-tpl").html());
              tpl.find(".news-title").html(item.title);
              tpl.find(".detail-news").html(item.content);
              tpl.find(".publish-date").html(item.pubDate);
              sliderCt.append(tpl);
            }
          }
        },
        complete: function(){
          sliderCt.find(".loader").addClass("hidden");
        },
        error: function (error) {
          console.log(error);
        }

      });
    },
    

    showNews(newsData){
      var data = newsData.news.items, len, key, newsCt, maxNews;
      newsCt = $( config.allSectionsMapping[newsData.news.type].el);
      len = data.length;
      maxNews = ABHNews.CommonUtils.getMaxNewsCount(len);
      for (key=len-1; key>=maxNews; key--) {
        var item = data[key];
        if(!item.image || item.image.trim() == "" || item.image == ".jpg" || item.image == ".jpeg" || item.image == "jpg"){
          item.image = "http://abhnews.com/news/localnews/img/news7.jpg";
        }
        var tpl = $($("#news-headline-tpl").html());
        tpl.find(".news-img").attr("src", ABHNews.CommonUtils.getImageUrl(newsData.news.type, item.image));
        tpl.find(".news-title").html(item.title);
        tpl.find(".news-detail-link").attr("href", config.newsDetailLink + "?id=" + item.id + "&newstype=" + newsData.news.type);
        tpl.find(".publish-date").html(item.pubDate);
        tpl.find(".news-detail-link").attr("data-newsid", item.id);
        tpl.find(".news-detail-link").attr("data-newstype", newsData.news.type);
        newsCt.append(tpl);
      }
      newsCt.bxSlider(config.bxSliderConfig);
    },

    showNewsModal: function (heading, content, config) {
      var newsModal;
      newsModal = $("#newsDescModal");
      newsModal.find(".modal-title").html(heading);
      newsModal.find(".modal-body").html(content);
      newsModal.modal("show");
      if (config) {

      }
    }
  }
  return fn;
})();


$(document).ready(function () {
  ABHNews.HomePage.init();
});