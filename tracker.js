var key = "id";
var redirectUrlBase = "https://easy-ng-universal.firebaseapp.com/";

var value = localStorage.getItem(key);
if (value) {
    var redirectUrl = redirectUrlBase + location.search;
    if (document.referrer) {
        var referrer = "ref=" + encodeURIComponent(document.referrer);
        redirectUrl = redirectUrl + (location.search ? '&' : '?') + referrer;
    }
    var finalRedirectUrl = redirectUrl + (redirectUrl.indexOf('?') > -1 ? '&' : '?') + 'id=' + value;
    console.log('Redirect after 3 seconds');
    setTimeout(() => {
        console.log('Redirect to ' + finalRedirectUrl);
        location.replace(finalRedirectUrl);
    }, 3000);
} else {
    var id = Math.floor(99999999999 * Math.random());
    localStorage.setItem(key, id);
}
