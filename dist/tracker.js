var userIdKey = "userId";
var itemIdKey = "itemId";
var redirectUrlBase = "https://easy-ng-universal.firebaseapp.com/";
var redirectTimeout = 3000;

var viewItemId = getViewItemId();
if (viewItemId) {
    localStorage.setItem(itemIdKey, viewItemId);
    console.log('あなたがたった今閲覧した商品は ' + viewItemId + ' です。');
} else {
    console.log('あなたが最後に閲覧した商品は ' + localStorage.getItem(itemIdKey) + ' です。');
}

var userId = localStorage.getItem(userIdKey);
if (userId) {
    var redirectUrl = redirectUrlBase + location.search;
    if (document.referrer) {
        var referrer = "ref=" + encodeURIComponent(document.referrer);
        redirectUrl = redirectUrl + (location.search ? '&' : '?') + referrer;
    }
    var finalRedirectUrl = redirectUrl + (redirectUrl.indexOf('?') > -1 ? '&' : '?') + 'userId=' + userId;
    console.log(redirectTimeout / 1000 + '秒後にリダイレクトします。');
    setTimeout(() => {
        console.log('リダイレクトしました。 ' + finalRedirectUrl);
        location.replace(finalRedirectUrl);
    }, 3000);
} else {
    var id = Math.floor(99999999999 * Math.random());
    localStorage.setItem(userIdKey, id);
}


function getViewItemId() {
    var pathname = '/' + document.referrer.split('/').reverse()[0];
    if (pathname.startsWith('/p1')) {
        return 'p1';
    } else if (pathname.startsWith('/p2')) {
        return 'p2';
    } else {
        return '';
    }
}