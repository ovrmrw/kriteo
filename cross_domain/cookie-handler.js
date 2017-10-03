(function () {
    var queryKey = '_adp_cd_id';
    var cookieKey = '_adp_uid';
    
    var cdIdFromParams = getCrossDomainIdFromQueryParams(queryKey);
    var userIdFromCookie = getAdpUserIdFromCookie(cookieKey);

    var now = Math.round(Date.now() / 1000);
    var timestamp = cdIdFromParams
        ? Number(cdIdFromParams.split('.')[1])
        : 0;

    if (cdIdFromParams && timestamp && now < timestamp + 60 * 2) {
        var userId = cdIdFromParams.split('.')[0];
        setCookie(userId, 'クエリパラメータで1st party Cookieを上書きしました。');
    } else if (!userIdFromCookie) {
        var newUserId = '' + Math.floor(99999999 * Math.random());
        setCookie(newUserId, '1st party Cookieを新しくセットしました。');
    }

    function setCookie(userId, message) {
        var values = [
            cookieKey + '=' + userId,
            maxAge(),
            path(),
            domain(),
        ];
        var cookie = values.join('; ');
        document.cookie = cookie;
        console.log(message, cookieKey + '=' + userId, '(' + location.href + ')');
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
        var cdId = cdIdParam
            ? cdIdParam.split('=')[1]
            : '';
        return cdId;
    }

    function getAdpUserIdFromCookie(key) {
        var cookie = document.cookie.split(';')
            .map(s => s.trim())
            .find(s => s.indexOf('=') > -1 && s.split('=')[0] === key);
        var userId = cookie
            ? cookie.split('=')[1]
            : '';
        return userId;
    }
})();
