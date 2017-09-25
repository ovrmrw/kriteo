var key = 'kriteoId';

var str = document.cookie.split(';')
  .map(str => str.trim())
  .find(str => str.indexOf('=') > -1 && str.split('=')[0] === key);

if (str) {
  var value = str.split('=')[1];
  console.log('3rd party Cookieの読み取りに成功しました。 id:', value);
} else {
  var id = '' + Math.floor(99999999999 * Math.random());
  var values = [
    key + '=' + id,
    // maxAge(),
    expires(),
    path(),
    domain(),
    'Secure'
  ];
  document.cookie = values.join('; ');
  console.log('3rd party Cookieを新しくセットしました。 id:', id);
}


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
  return encodeURIComponent(value);
}