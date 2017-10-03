if (!window._adpCrossDomainKey) {
    window._adpCrossDomainKey = '_adp_cd_id';
}

if (!window._adpCookieKey) {
    window._adpCookieKey = '_adp_uid';
}

if (!window._adpCrossDomainTargets) {
    window._adpCrossDomainTargets = [
        'cross-a-5b0e9.firebaseapp.com',
        'cross-b-11cf3.firebaseapp.com',
        'cross-c-5a991.firebaseapp.com',
        'cross-d-423dc.firebaseapp.com',
    ];
}

if (!window._adpLinker) {
    window._adpLinker = function (url) { return url; };
}

(function () {
    var queryKey = window._adpCrossDomainKey;
    var cookieKey = window._adpCookieKey;
    var crossDomainTargets = window._adpCrossDomainTargets;

    var eventNames = ['click', 'keydown', 'touchstart', 'touchend'];

    setEventListners();

    function setEventListners() {
        eventNames.forEach(eventName => {
            window.addEventListener(eventName, linkUrlDecorator, false);
        });
    }

    function linkUrlDecorator(event) {
        var target = event.target.form
            ? event.target.form
            : event.target;
        var isForm = target.tagName === 'FORM';
        var url = isForm
            ? target.action
            : target.href;
        var newUrl = getDecoratedUrl(url);
        if (isForm) {
            target.action = newUrl;
        } else {
            target.href = newUrl;
        }
    }

    function getDecoratedUrl(url) {
        if (url && isCrossDomainTarget(url) && !containsCrossDomainId(url, queryKey)) {
            var userId = getCrossDomainIdFromCookie(cookieKey);
            var decoratedUrl = addCrossDomainId(url, queryKey, userId);
            return decoratedUrl;
        } else {
            return url;
        }
    }

    window._adpLinker = getDecoratedUrl;

    function isCrossDomainTarget(href) {
        return crossDomainTargets.some(target => href.indexOf(target) > -1);
    }

    function containsCrossDomainId(href, key) {
        return href.indexOf('?' + key + '=') > -1 || href.indexOf('&' + key + '=') > -1;
    }

    function addCrossDomainId(href, key, userId) {
        if (!userId) {
            return href;
        }
        var now = Math.round(Date.now() / 1000);
        var cdId = userId + '.' + now;
        var url = href.indexOf('#') > -1
            ? href.split('#')[0]
            : href;
        var hash = href.indexOf('#') > -1
            ? '#' + href.split('#')[1]
            : '';
        var newUrl = url.indexOf('?') > -1
            ? url + '&' + key + '=' + encodeURIComponent(cdId)
            : url + '?' + key + '=' + encodeURIComponent(cdId)
        var newHref = hash
            ? newUrl + hash
            : newUrl;
        return newHref;
    }

    function getCrossDomainIdFromCookie(key) {
        var cookie = document.cookie.split(';')
            .map(s => s.trim())
            .find(s => s.indexOf('=') > -1 && s.split('=')[0] === key);
        var userId = cookie
            ? cookie.split('=')[1]
            : '';
        return userId;
    }
})();

(function () {
    var elements = Array.from(document.querySelectorAll('meta[http-equiv="refresh"]'));
    elements.forEach(element => {
        var content = element.content;
        var values = content.split(';').map(s => s.trim());
        var timeout = values[0];
        var url = values.length > 1
            ? values[1].replace(/(url=|'|")/ig, '')
            : '';
        var newUrl = window._adpLinker(url);
        element.content = timeout + ';' + newUrl;
    });
})();
