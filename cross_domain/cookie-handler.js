if (!window._apdCrossDomainKey) {
    window._apdCrossDomainKey = '_adp_cd_id';
}

(function () {
    var adpKey = window._apdCrossDomainKey;

    var cookie = document.cookie.split(';')
        .map(s => s.trim())
        .find(s => s.indexOf('=') > -1 && s.split('=')[0] === adpKey);
    var cdId = cookie ? cookie.split('=')[1] : '';

    if (!cdId) {
        var newCdId = '' + Math.floor(99999999999 * Math.random()) + '.' + Math.round(Date.now() / 1000);
        var values = [
            adpKey + '=' + newCdId,
            maxAge(),
            path(),
            domain(),
            // 'secure'
        ];
        var cookie = values.join('; ');
        document.cookie = cookie;
        console.log('1st party Cookieを新しくセットしました。 cross domain id:', newCdId);
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
})();
