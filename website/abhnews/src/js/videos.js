var ABHNews = ABHNews || {};
ABHNews.VideosPage = (function () {
    var fn, config;
    config = {
        
    };

    fn = {
        init: function () {
            fn.getVideosData();
        },
        getVideosData: function () {
            var url = "./news/videos/data.json";

            $.ajax({
                url: url,
                success: function (data) {
                    var ct,video;
                    for(var k in data.videos.items){
                        video = data.videos.items[k];
                        ct = $(".videos-section");
                        ct.append('<div class="video-title margin-top-10">'+ video.title +'</div>');
                        ct.append('<div class="publish-date margin-bottom-10">'+ video.pubDate +'</div>');
                        ct.append('<div class="video"><iframe width="654" height="380" src='+ video.videolink +' frameborder="0" allowfullscreen></iframe></div>');
                    }
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
    ABHNews.VideosPage.init();
});