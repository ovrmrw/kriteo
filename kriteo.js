var kriteoFrameId = 'dynamic-kriteo-frame';
var dexieScriptId = 'dynamic-dexiejs';
var externalHost = 'https://ovrmrw.github.io'

var isDexieLoaded = false;

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
    var timer = setInterval(function () {
      if (!isDexieLoaded) { return; }
      var data = event.data;
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = 'true';
      // script.innerHTML = data;
      script.src = event.data;
      document.body.appendChild(script);
      clearInterval(timer);
    }, 10);
    setTimeout(function () {
      isDexieLoaded = true;
    }, 1000);
  }
}, false);


function appendDexieJS() {
  var script = document.createElement('script');
  script.id = dexieScriptId;
  script.type = 'text/javascript';
  script.async = 'true';
  script.onload = function () {
    isDexieLoaded = true;
  };
  script.src = 'https://unpkg.com/dexie@2.0.0/dist/dexie.min.js';
  document.body.appendChild(script);
}
