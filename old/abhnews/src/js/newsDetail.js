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
                success: function (data) {
                    var news, ct,item;
                    news = data.news.items;
                    item = news[parseInt(config.newsId)-1];
                    ct = $(".news-section");
                    ct.find(".news-img").attr("src",item.image); 
                    ct.find(".news-title").text(item.title);
                    ct.find(".publish-date").text(item.pubDate);
                    ct.find(".detail-news").html(item.description);
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }
    }
    return fn;
})();

$(document).ready(function(){
    ABHNews.NewsDetailPage.init();
});