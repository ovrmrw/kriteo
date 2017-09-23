var db = new Dexie("kriteo");
db.version(1).stores({
  tracker: 'key,value'
});

var userIdKey = "userId";
var itemIdKey = "itemId";
var redirectUrlBase = "https://easy-ng-universal.firebaseapp.com/";
var redirectTimeout = 3000;

function main() {
  var viewItemId = getViewItemId();
  const promise = new Promise(resolve => {
    if (viewItemId) {
      setItemId(viewItemId)
        .then(() => {
          console.log('あなたがたった今閲覧した商品は ' + viewItemId + ' です。');
          resolve();
        })
    } else {
      getItemId()
        .then(itemId => {
          var message = 'あなたが最後に閲覧した商品は ' + itemId + ' です。';
          console.log(message);
          setTimeout(() => {
            alert(message);
          });
          resolve();
        })
    }
  })

  promise
    .then(() => getUserId())
    .then(userId => {
      if (userId) {
        var redirectUrl = redirectUrlBase + location.search;
        if (document.referrer) {
          var referrer = "ref=" + encodeURIComponent(document.referrer);
          redirectUrl = redirectUrl + (location.search ? '&' : '?') + referrer;
        }
        var finalRedirectUrl = redirectUrl + (redirectUrl.indexOf('?') > -1 ? '&' : '?') + 'userId=' + userId;
        console.log(redirectTimeout / 1000 + '秒後にリダイレクトします。');
        setTimeout(() => {
          console.log('リダイレクトしました。 ' + finalRedirectUrl);
          location.replace(finalRedirectUrl);
        }, 3000);
      } else {
        var id = Math.floor(99999999999 * Math.random());
        setUserId(id)
      }
    })
}

main();


function getViewItemId() {
  var pathname = '/' + document.referrer.split('/').reverse()[0];
  if (pathname.startsWith('/p1')) {
    return 'p1';
  } else if (pathname.startsWith('/p2')) {
    return 'p2';
  } else {
    return '';
  }
}

function setUserId(id) {
  return db.tracker.put({ key: 'userId', value: id })
}

function getUserId() {
  return db.tracker.get('userId')
    .then(result => result ? result.value : '')
    .catch(err => '')
}

function setItemId(id) {
  return db.tracker.put({ key: 'itemId', value: id })
}

function getItemId() {
  return db.tracker.get('itemId')
    .then(result => result ? result.value : '')
    .catch(err => '')
}
