if (!window._adpCrossDomainTargets) {
    window._adpCrossDomainTargets = [
        'cross-a-5b0e9.firebaseapp.com',
        'cross-b-11cf3.firebaseapp.com',
    ];
}

if (!window._apdCrossDomainKey) {
    window._apdCrossDomainKey = '_adp_cd_id';
}

(function () {
    var adpKey = window._adpCrossDomainKey;
    var crossDomainTargets = window._adpCrossDomainTargets;

    var eventNames = ['click', 'keydown', 'touchstart', 'touchend'];
    var cookie = document.cookie.split(';')
        .map(s => s.trim())
        .find(s => s.indexOf('=') > -1 && s.split('=')[0] === adpKey);
    var cdId = getCrossDomainIdFromQueryParams(adpKey)
        ? getCrossDomainIdFromQueryParams(adpKey)
        : cookie
            ? cookie.split('=')[1]
            : '';

    window.addEventListener('DOMContentLoaded', function () {
        setEventListners();
    });

    function setEventListners() {
        eventNames.forEach(eventName => {
            window.addEventListener(eventName, linkUrlReplacer, false);
        });
    }

    function linkUrlReplacer(event) {
        console.log(event)
        var target = event.target.form
            ? event.target.form
            : event.target;
        var isForm = target.tagName === 'FORM';
        var href = isForm
            ? target.action
            : target.href;
        if (href && isCrossDomainTarget(href) && notContainsUid(href, adpKey)) {
            var newHref = createNewHref(href, adpKey, cdId);
            if (isForm) {
                target.action = newHref;
            } else {
                target.href = newHref;
            }
        }
    }

    function isCrossDomainTarget(href) {
        return crossDomainTargets.some(target => href.indexOf(target) > -1);
    }

    function notContainsUid(href, key) {
        return href.indexOf('?' + key + '=') === -1 && href.indexOf('&' + key + '=') === -1;
    }

    function createNewHref(href, key, value) {
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

    function getCrossDomainIdFromQueryParams(key) {
        if (!key) {
            return '';
        }
        var params = location.search.replace('?', '').split('&');
        var cdIdParam = params.find(p => p.split('=')[0] === key);
        return cdIdParam ? cdIdParam.split('=')[1] : '';
    }
})();


(function () {
    window.addEventListener('beforeunload', function (event) {
        event.returnValue = true;
    })
})();
