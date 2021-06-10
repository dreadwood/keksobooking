
(() => {
  const URL_LOAD = 'https://22.javascript.pages.academy/keksobooking/data';
  const URL_UPLOAD = 'https://22.javascript.pages.academy/keksobooking';

  const statusCode = {
    OK: 200,
  };

  const loadData = (loadCallback, errorCallback) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === statusCode.OK) {
        loadCallback(xhr.response);
      } else {
        errorCallback('Ошибочка вышла: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', () => {
      errorCallback('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', () => {
      errorCallback('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  const uploadData = (data, upLoadCallback, onErrorCallback) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
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
    upload: uploadData,
  };
})();
