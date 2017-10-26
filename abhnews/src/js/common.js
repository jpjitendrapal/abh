var ABHNews = ABHNews || {};
ABHNews.CommonUtils = ABHNews.CommonUtils || {};
ABHNews.CommonUtils = {
    config: {
        showTopNewsCount: 10
    },
    getQueryParam: function (a) {
        try {
            a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var b = "[\\?&]" + a + "=([^&#]*)";
            var c = new RegExp(b);
            var d = c.exec(unescape(window.location.href));
            if (d == null) {
                return null;
            } else {
                return d[1];
            }
        } catch (e) {
            console.log(e);
        }
    },
    getMaxNewsCount: function (itemLen) {
        var len;
        len = itemLen > this.config.showTopNewsCount ? (itemLen - this.config.showTopNewsCount) : 0;
        return len;
    },
    getImageUrl: function (newsType, imageName) {
        var imageUrl="";
        if(imageName.startsWith("http:") || imageName.startsWith("www.")){
            imageUrl = imageName;
        } else {
            imageUrl = "/news/" + newsType + "/img/" + imageName;
        }
        return imageUrl;
    },
    elementInViewport: function(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;
      
        while(el.offsetParent) {
          el = el.offsetParent;
          top += el.offsetTop;
          left += el.offsetLeft;
        }
      
        return (
          top >= window.pageYOffset &&
          left >= window.pageXOffset &&
          (top + height) <= (window.pageYOffset + window.innerHeight) &&
          (left + width) <= (window.pageXOffset + window.innerWidth)
        );
      }

}

