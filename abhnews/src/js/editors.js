var ABHNews = ABHNews || {};
ABHNews.EditorPage = ABHNews.EditorPage || {};
ABHNews.EditorPage = (function () {
  var fn, config;
  config = {
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
    }
  }
  fn = {
    init: function () {
      fn.showPageData();
      
    },
    showPageData: function (url, ct) {
      fn.getLocalNewsData("./news/editors/data.json", fn.showEditors);
      // fn.getLocalNewsData("./news/reporters/data.json", fn.showReporters);
    },
    getLocalNewsData: function (url, cb) {
      $.ajax({
        url: url,
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
    
    showEditors: function (newsData) {
      var data = newsData.news;
      var newsCt = $(".bxslider-5");
      for (var key in data.items) {
        var item = data.items[key];
        var tpl = $($("#editors-tpl").html());
        tpl.find(".member-img").attr("src", ABHNews.CommonUtils.getImageUrl(data.type, item.image));
        tpl.find(".member-name").html(item.name);
        tpl.find(".member-desig").html(item.designation);
        tpl.find(".profile-link").attr("href", item.profileLink);
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
    showReporters: function (newsData) {
      var data = newsData.news;
      var newsCt = $(".bxslider-6");
      for (var key in data.items) {
        var item = data.items[key];
        var tpl = $($("#editors-tpl").html());
        tpl.find(".member-img").attr("src", ABHNews.CommonUtils.getImageUrl(data.type, item.image));
        tpl.find(".member-name").html(item.name);
        tpl.find(".member-desig").html(item.designation);
        tpl.find(".profile-link").attr("href", item.profileLink);
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
    }
  }
  return fn;
})();


$(document).ready(function () {
  ABHNews.EditorPage.init();
});