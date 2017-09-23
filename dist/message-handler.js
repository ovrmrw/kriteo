window.addEventListener('message', function (event) {
  if (event.data) {
    getScript(event.data)
      .then(function (script) {
        event.source.postMessage(script, event.origin);
      })
  }
}, false);


function getScript(type) {
  var file = type === 'localstroage'
    ? 'tracker.js'
    : 'tracker-db.js';
  return fetch(file)
    .then(function (response) {
      return response.text();
    })
    .catch(function (err) {
      console.error(err);
      return '';
    });
}
