var db = new Dexie("kriteo");
db.version(1).stores({
  tracker: 'key,value'
});

var userIdKey = "userId";
var itemIdKey = "itemId";
var redirectUrlBase = "https://easy-ng-universal.firebaseapp.com/";
var redirectTimeout = 3000;

function main() {
  Promise.resolve()
    .then(() => {
      var viewItemId = getViewItemId();
      if (viewItemId) {
        return setItemId(viewItemId)
          .then(() => {
            console.log('あなたがたった今閲覧した商品は ' + viewItemId + ' です。');
          })
      } else {
        return getItemId()
          .then(itemId => {
            var message = 'あなたが最後に閲覧した商品は ' + itemId + ' です。';
            console.log(message);
            setTimeout(() => {
              alert(message);
            });
          })
      }
    })
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
    .catch(err => {
      throw err;
    });
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
  return db.tracker.put({ key: userIdKey, value: id })
    .catch(err => errorHandler(err));
}

function getUserId() {
  return db.tracker.get(userIdKey)
    .then(result => result ? result.value : '')
    .catch(err => {
      errorHandler(err);
      return '';
    });
}

function setItemId(id) {
  return db.tracker.put({ key: itemIdKey, value: id })
    .catch(err => errorHandler(err));
}

function getItemId() {
  return db.tracker.get(itemIdKey)
    .then(result => result ? result.value : '')
    .catch(err => {
      errorHandler(err);
      return '';
    });
}

function errorHandler(err) {
  console.error(err)
  try {
    var message = err.message ? err.message : err;
    var div = document.createElement('div');
    div.textContent = message;
    div.style.color = 'red';
    document.body.appendChild(div);
  } catch (e) { }
}
