var ABHNews = ABHNews || {};
ABHNews.CommonUtils = ABHNews.CommonUtils || {};
ABHNews.CommonUtils.getQueryParam = function (a) {
    try{
        a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var b = "[\\?&]" + a + "=([^&#]*)";
        var c = new RegExp(b);
        var d = c.exec(unescape(window.location.href));
        if (d == null) {
            return null;
        } else {
            return d[1];
        }
    } catch(e){
        console.log(e);
    }
    
};