var key = "id";
var redirectUrlBase = "https://friendlychat-ng4.firebaseapp.com/";

var value = localStorage.getItem(key);
if (value) {
    var redirectUrl = redirectUrlBase + location.search;
    if (document.referrer) {
        var referrer = "ref=" + encodeURIComponent(document.referrer);
        redirectUrl = redirectUrl + (location.search ? '&' : '?') + referrer;
    }
    location.href = redirectUrl + (redirectUrl.indexOf('?') > -1 ? '&' : '?') + 'id=' + value;
} else {
    var id = Math.floor(99999999999 * Math.random());
    localStorage.setItem(key, id);
}
