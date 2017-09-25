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
        return "./news/" + newsType + "/img/" + imageName;
    },

}

