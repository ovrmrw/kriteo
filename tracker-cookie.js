var key = 'kriteoId';

var str = document.cookie.split(';')
  .map(str => str.trim())
  .find(str => str.indexOf('=') > -1 && str.split('=')[0] === key);

if (str) {
  var value = str.split('=')[1];
  console.log('3rd party Cookieの読み取りに成功しました。 id:', value);
} else {
  var id = '' + Math.floor(99999999999 * Math.random());
  document.cookie = key + '=' + id + '; expires=Tue, 19 Jan 2038 03:14:07 GMT';
  console.log('3rd party Cookieを新しくセットしました。 id:', id);
}
