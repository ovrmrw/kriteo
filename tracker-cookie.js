var key = 'kriteoId';

var str = document.cookie.split(';')
  .map(str => str.trim())
  .find(str => str.indexOf('=') > -1 && str.split('=')[0] === key);

if (str) {
  var value = str.split('=')[1];
  var message = '3rd party Cookieの読み取りに成功しました。 id:' + value;
  console.log(message);
  alert(message);
} else {
  var id = '' + Math.floor(99999999999 * Math.random());
  var values = [
    key + '=' + id,
    // maxAge(),
    // expires(),
    // path(),
    // domain(),
    // 'secure'
  ];
  var cookie = values.join('; ');
  console.log('cookie:', cookie);
  document.cookie = cookie;
  console.log('3rd party Cookieを新しくセットしました。 id:', id);
}

// window.addEventListener('message', function (event) {
//   if (event.data === 'cookie') {
//     document.cookie = 'x=hoge; domain=' + location.host;
//     event.source.postMessage('cookie:' + document.cookie, event.origin);
//   }
// }, false);


function maxAge() {
  var value = 60 * 60 * 24 * 365 * 2;
  return 'max-age=' + encode(value);
}

function expires() {
  var value = 'Tue, 19 Jan 2038 03:14:07 GMT';
  return 'expires=' + encode(value);
}

function path() {
  var value = '/';
  return 'path=' + encode(value);
}

function domain() {
  var value = location.host;
  return 'domain=' + encode(value);
}

function encode(value) {
  // return encodeURIComponent(value);
  return value;
}
