if (!window._adpCrossDomainKey) {
    window._adpCrossDomainKey = '_adp_cd_id';
}

(function () {
    var adpKey = window._adpCrossDomainKey;

    var cookie = document.cookie.split(';')
        .map(s => s.trim())
        .find(s => s.indexOf('=') > -1 && s.split('=')[0] === adpKey);
    var cdId = cookie
        ? cookie.split('=')[1]
        : '';

    if (!cdId) {
        var newCdId = '' + Math.floor(99999999 * Math.random()) + '.' + Date.now();
        setCookie(newCdId, '1st party Cookieを新しくセットしました。');
    } else if (getCrossDomainIdFromQueryParams(adpKey)) {
        var newCdId = getCrossDomainIdFromQueryParams(adpKey);
        setCookie(newCdId, 'クエリパラメータで1st party Cookieを上書きしました。');
    }

    function setCookie(crossDomainId, message) {
        var values = [
            adpKey + '=' + crossDomainId,
            maxAge(),
            path(),
            domain(),
        ];
        var cookie = values.join('; ');
        document.cookie = cookie;
        console.log(message, 'crossDomainId:', crossDomainId, '(' + location.href + ')');
    }

    function maxAge() {
        var value = 60 * 60 * 24 * 365 * 2;
        return 'max-age=' + value;
    }

    function path() {
        var value = '/';
        return 'path=' + value;
    }

    function domain() {
        var value = location.host;
        return 'domain=' + value;
    }

    function containsCrossDomainId(key) {
        var href = location.href;
        return href.indexOf('?' + key + '=') > -1 || href.indexOf('&' + key + '=') > -1;
    }

    function getCrossDomainIdFromQueryParams(key) {
        if (!key) { return ''; }
        var params = location.search.replace('?', '').split('&');
        var cdIdParam = params.find(p => p.split('=')[0] === key);
        return cdIdParam
            ? cdIdParam.split('=')[1]
            : '';
    }
})();
