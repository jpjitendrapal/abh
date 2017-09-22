var ABHNews = ABHNews || {};
ABHNews.NewsDetailPage = (function () {
    var fn, config;
    config = {
        newsId: 1,
        newsType: "breaking"
    };

    fn = {
        init: function () {
            fn.getNewsData();
            fn.updateFbShareBtn();
        },
        updateFbShareBtn: function(){
            $(".fb-share-button").data("href", window.location.href);
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
                            ct.find(".news-img").attr("src",item.image); 
                            ct.find(".news-title").text(item.title);
                            ct.find(".publish-date").text(item.pubDate);
                            ct.find(".detail-news").html(item.description);
                            return;
                        }
                    }
                    if(!newsFound){
                        window.location = "http://abhnews.com/";
                    }
                },
                error: function (data) {
                    // console.log(data);
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