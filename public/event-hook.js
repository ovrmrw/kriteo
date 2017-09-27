'use strict';

(function () {
    var crossDomainTargets = ['google.com'];
    var eventNames = ['click', 'keydown', 'touchstart', 'touchmove', 'touchremove'];
    var key = '_uid';
    var value = 'hoge';

    eventNames.forEach(eventName => {
        window.addEventListener(eventName, callback, false);
    });

    function callback(event) {
        console.log('evnet on click:', event);
        var href = event.target.href;
        if (href && isCrossDomainTarget(href) && notContainsUid(href, key)) {
            var newHref = href.indexOf('?') > -1
                ? href + '&' + key + '=' + value
                : href + '?' + key + '=' + value
            event.target.href = newHref;
        }
    }

    function isCrossDomainTarget(href) {
        return crossDomainTargets.some(target => href.indexOf(target) > -1);
    }

    function notContainsUid(href, key) {
        return href.indexOf(key + '=') === -1;
    }
})();
