var id = 'kriteo-frame';
var externalHost = 'https://ovrmrw.github.io'

var iframe = document.createElement('iframe');
iframe.id = id;
iframe.width = 0;
iframe.height = 0;
iframe.style.display = 'none';
iframe.style.visibility = 'hidden';
iframe.src = externalHost + '/kriteo/';

document.body.appendChild(iframe);

window.onload = function () {
  var w = document.querySelector('#' + id).contentWindow;
  w.postMessage('script', externalHost);
};

window.addEventListener('message', function (event) {
  console.log('event on host:', event);
  if (event.origin === externalHost) {
    // var userId = JSON.parse(event.data)[0];
    // var itemId = JSON.parse(event.data)[1];
    // var href = JSON.parse(event.data)[2];
    // console.log('userId', userId);
    // console.log('itemId', itemId);
    // console.log('location.href', href);
    var data = event.data;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = data;
    document.body.appendChild(script);
  }
}, false);
