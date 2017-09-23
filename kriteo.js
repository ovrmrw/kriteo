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

window.addEventListener('message', function (event) {
  console.log('event on host:', event);
}, false);

window.onload = function () {
  var w = document.querySelector('#' + id).contentWindow;
  w.postMessage(location.href, externalHost);
};
