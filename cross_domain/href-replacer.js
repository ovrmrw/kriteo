if (!window._adpCrossDomainTargets) {
    window._adpCrossDomainTargets = [
        'cross-a-5b0e9.firebaseapp.com',
        'cross-b-11cf3.firebaseapp.com',
        'cross-c-5a991.firebaseapp.com',
    ];
}

if (!window._adpCrossDomainKey) {
    window._adpCrossDomainKey = '_adp_cd_id';
}

if (!window._adpLinker) {
    window._adpLinker = function (url) { return url; };
}

(function () {
    var adpKey = window._adpCrossDomainKey;
    var crossDomainTargets = window._adpCrossDomainTargets;

    var eventNames = ['click', 'keydown', 'touchstart', 'touchend'];
    // var cdId = getCrossDomainIdFromQueryParams(adpKey) || getCrossDomainIdFromCookie(adpKey);

    setEventListners();

    function setEventListners() {
        eventNames.forEach(eventName => {
            window.addEventListener(eventName, linkUrlReplacer, false);
        });
    }

    function linkUrlReplacer(event) {
        var target = event.target.form
            ? event.target.form
            : event.target;
        var isForm = target.tagName === 'FORM';
        var url = isForm
            ? target.action
            : target.href;
        // if (href && isCrossDomainTarget(href) && !containsCrossDomainId(href, adpKey)) {
        //     var cdId = getCrossDomainIdFromCookie(adpKey);
        //     var now = Math.round(Date.now() / 1000);
        //     var newCdId = cdId.indexOf('.') > -1
        //       ? cdId.split('.')[0] + '.' + now
        //       : cdId;
        //     var newHref = decorateUrl(href, adpKey, newCdId);
        //     if (isForm) {
        //         target.action = newHref;
        //     } else {
        //         target.href = newHref;
        //     }
        // }
        var newUrl = getDecoratedUrl(url);
        if (isForm) {
            target.action = newUrl;
        } else {
            target.href = newUrl;
        }
    }

    function getDecoratedUrl(url) {
        if (url && isCrossDomainTarget(url) && !containsCrossDomainId(url, adpKey)) {
            var cdId = getCrossDomainIdFromCookie(adpKey);
            var now = Math.round(Date.now() / 1000);
            var newCdId = cdId.indexOf('.') > -1
                ? cdId.split('.')[0] + '.' + now
                : cdId;
            var newUrl = decorateUrl(url, adpKey, newCdId);
            return newUrl;
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

    function decorateUrl(href, key, value) {
        if (!value) {
            return href;
        }
        var url = href.indexOf('#') > -1
            ? href.split('#')[0]
            : href;
        var hash = href.indexOf('#') > -1
            ? '#' + href.split('#')[1]
            : '';
        var newUrl = url.indexOf('?') > -1
            ? url + '&' + key + '=' + encodeURIComponent(value)
            : url + '?' + key + '=' + encodeURIComponent(value)
        var newHref = hash
            ? newUrl + hash
            : newUrl;
        return newHref;
    }

    // function getCrossDomainIdFromQueryParams(key) {
    //     if (!key) {
    //         return '';
    //     }
    //     var params = location.search.replace('?', '').split('&');
    //     var cdIdParam = params.find(p => p.split('=')[0] === key);
    //     var cdId = cdIdParam 
    //         ? cdIdParam.split('=')[1] 
    //         : '';
    //     return cdId;
    // }

    function getCrossDomainIdFromCookie(key) {
        var cookie = document.cookie.split(';')
            .map(s => s.trim())
            .find(s => s.indexOf('=') > -1 && s.split('=')[0] === key);
        var cdId = cookie
            ? cookie.split('=')[1]
            : '';
        return cdId;
    }
})();

(function () {
    var elements = Array.from(document.querySelectorAll('meta[http-equiv="refresh"]'));
    elements.forEach(element => {
        var content = element.content;
        var values = content.split(';').map(s => s.trim());
        var timeout = values[0];
        var url = values[1];
        var newUrl = window._adpLinker(url);
        element.content = timeout + ';' + newUrl;
    });
})();

// (function () {
//     window.addEventListener('beforeunload', function (event) {
//         event.returnValue = true;
//     });
// })();
