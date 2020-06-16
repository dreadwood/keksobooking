'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';

  var statusCode = {
    OK: 200
  };

  var loadData = function (loadCallback, errorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        loadCallback(xhr.response);
      } else {
        errorCallback('Ошибочка вышла: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorCallback('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorCallback('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var uploadData = function (data, upLoadCallback, onErrorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        upLoadCallback();
      } else {
        onErrorCallback('Ошибочка вышла: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    upload: uploadData
  };
})();
