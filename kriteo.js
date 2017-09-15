// var key = "___hoge___";
// var url = "https://ovrmrw.github.io/my-first-react-typescript/";
// var value = localStorage.getItem(key);
// if (value) {
//     var redirect_url = url + location.search;
//     if (document.referrer) {
//         var referrer = "ref=" + encodeURIComponent(document.referrer);
//         redirect_url = redirect_url + (location.search ? '&' : '?') + referrer;
//     }
//     // location.href = redirect_url + (redirect_url.indexOf('?') > -1 ? '&' : '?') + 'id=' + value;

// } else {
//     var randomValue = Math.floor(99999999999 * Math.random());
//     localStorage.setItem(key, randomValue);    
// }


var iframe = document.createElement('iframe');
iframe.width = 0;
iframe.height = 0;
iframe.style.display = 'none';
iframe.src = ''