var ABHNews = ABHNews || {};
ABHNews.NewsDetailPage = (function () {
    var fn, config;
    config = {
        newsId: 1,
        newsType: "breaking",
        newsDetailLink: "/newsdetail.html",
    };

    fn = {
        init: function () {
            fn.getNewsData();
            fn.updateFbShareBtn();
        },
        updateFbShareBtn: function(){
            $(".fb-share-button").data("href", window.location.href);
        },
        showOtherNews: function (newsData) {
            var data = newsData.news.items, len, maxNews, newsCt, key;
            newsCt = $(".other-news");
            len = data.length;
            maxNews = ABHNews.CommonUtils.getMaxNewsCount(len);
            $(".other-news-ct .heading3 b").html(newsData.news.newsHeading);
            for (key=len-1; key>=maxNews; key--) {
              var item = data[key];
              var tpl = $($("#news-headline-tpl").html());
              if(item.image && !!item.image.trim()){
                tpl.find(".news-img").attr("src", ABHNews.CommonUtils.getImageUrl(newsData.news.type, item.image));
              } else {
                tpl.find(".news-img").addClass("hidden");
              }
              
              tpl.find(".news-title").html(item.title);
              tpl.find(".detail-news").html(item.description);
              tpl.find(".news-detail-link").attr("href", config.newsDetailLink + "?id=" + item.id + "&newstype=" + newsData.news.type);
              tpl.find(".publish-date").html(item.pubDate);
              tpl.find(".news-detail-link").attr("data-newsid", item.id);
              tpl.find(".news-detail-link").attr("data-newstype", newsData.news.type);
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
              });
        },
        getNewsData: function () {
            config.newsId = ABHNews.CommonUtils.getQueryParam("id");
            config.newsType = ABHNews.CommonUtils.getQueryParam("newstype");
            var url = "./news/" + config.newsType + "/data.json";

            $.ajax({
                url: url,
                beforeSend: function(){
                    $(".site-loader").removeClass("hidden");
                },
                success: function (data) {
                    var news, ct,item, len, newsFound = false;
                    news = data.news.items;
                    len = news.length;
                    for(var key in news){
                        item = news[key];
                        if(item.id == config.newsId){
                            newsFound = true;
                            ct = $(".news-section");
                            ct.find(".news-img").attr("src", ABHNews.CommonUtils.getImageUrl(data.news.type, item.image)); 
                            ct.find(".news-title").text(item.title);
                            ct.find(".publish-date").text(item.pubDate);
                            ct.find(".detail-news").html(item.description);
                            break;
                        }
                    }
                    if(!newsFound){
                        window.location = "http://abhnews.com/";
                    }
                    fn.showOtherNews(data);
                },
                error: function (data) {
                    window.location = "http://abhnews.com/";
                },
                complete: function(){
                    $(".site-loader").addClass("hidden");
                }
            });
        }
    }
    return fn;
})();

$(document).ready(function(){
    ABHNews.NewsDetailPage.init();
});