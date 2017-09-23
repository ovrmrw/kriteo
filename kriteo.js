var kriteoFrameId = 'dynamic-kriteo-frame';
var dexiejsId = 'dynamic-dexiejs';
var externalHost = 'https://ovrmrw.github.io'

var iframe = document.createElement('iframe');
iframe.id = kriteoFrameId;
iframe.width = 0;
iframe.height = 0;
iframe.style.display = 'none';
iframe.style.visibility = 'hidden';
iframe.src = externalHost + '/kriteo/';

document.body.appendChild(iframe);

window.onload = function () {
  var w = document.getElementById(kriteoFrameId).contentWindow;
  w.postMessage('indexeddb', externalHost);
};

window.addEventListener('message', function (event) {
  console.log('event on host:', event);
  if (event.origin === externalHost) {
    appendDexieJS();
    setTimeout(function () {
      var dexiejsScript = document.getElementById(dexiejsId);
      dexiejsScript.onload = function () {
        var data = event.data;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = 'true';
        script.innerHTML = data;
        document.body.appendChild(script);
      }
    });
  }
}, false);


function appendDexieJS() {
  var script = document.createElement('script');
  script.id = dexiejsId;
  script.type = 'text/javascript';
  script.src = 'https://unpkg.com/dexie@2.0.0/dist/dexie.min.js';
  document.body.appendChild(script);
}
