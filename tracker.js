var userIdKey = "userId";
var itemIdKey = "itemId";
var redirectUrlBase = "https://easy-ng-universal.firebaseapp.com/";

var viewItemId = getViewItemId();
if (viewItemId) {
    localStorage.setItem(itemIdKey, viewItemId);
}

var userId = localStorage.getItem(userIdKey);
if (userId) {
    var redirectUrl = redirectUrlBase + location.search;
    if (document.referrer) {
        var referrer = "ref=" + encodeURIComponent(document.referrer);
        redirectUrl = redirectUrl + (location.search ? '&' : '?') + referrer;
    }
    var finalRedirectUrl = redirectUrl + (redirectUrl.indexOf('?') > -1 ? '&' : '?') + 'userId=' + userId;
    console.log('Redirect after 3 seconds');
    setTimeout(() => {
        console.log('Redirect to ' + finalRedirectUrl);
        location.replace(finalRedirectUrl);
    }, 3000);
} else {
    var id = Math.floor(99999999999 * Math.random());
    localStorage.setItem(userIdKey, id);
}


function getViewItemId() {
    var pathname = location.pathname;
    if (pathname.startsWith('/p1')) {
        return 'p1';
    } else if (pathname.startsWith('/p2')) {
        return 'p2';
    } else {
        return '';
    }
}
