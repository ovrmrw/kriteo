var key = "___hoge___";
var value = localStorage.getItem(key);
if (value) {
    var redirect_url = "http://qiita.com" + location.search;
    if (document.referrer) {
        var referrer = "referrer=" + encodeURIComponent(document.referrer);
        redirect_url = redirect_url + (location.search ? '&' : '?') + referrer;
    }
    location.href = redirect_url + (redirect_url.indexOf('?') > -1 ? '&' : '?') + 'id=' + value;
} else {
    var randomValue = Math.random().toString(36).slice(-8);
    localStorage.setItem(key, randomValue);    
}
