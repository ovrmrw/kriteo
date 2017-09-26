var search = location.search.replace('?', '');

if (search) {
  var params = search.split('&');
  var redirectParam = params.find(p => p.split('=')[0] === 'redirect');

  if (redirectParam) {
    var url = redirectParam.split('=')[1];
    var redirectUrl = url.indexOf('%') > -1
      ? decodeURIComponent(url)
      : url;

    setTimeout(function () {
      console.log(redirectUrl + 'にリダイレクトします。');
      location.replace(redirectUrl);
    });
  }
}
