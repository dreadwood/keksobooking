'use strict';

(function () {
  var ORIGIN_COORDS_PIN_MAIN = 'left: 570px; top: 375px;';
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinMain = map.querySelector('.map__pin--main');
  var formFilters = map.querySelector('.map__filters');
  var houseCards; // для массив загруж данных
  var fragmentPin = document.createDocumentFragment(); // фрагм отрисовк

  var filterPinAd = function (evt, array) {
    var sortedArray;
    if (evt.target.value === 'any') {
      sortedArray = array;
    } else {
      sortedArray = array.filter(function (a) {
        return a.offer.type === evt.target.value;
      });
    }
    return sortedArray;
  };

  // Cоздать фрагмент с pin--ad
  var createPins = function (data) {
    var dataForPins = data.slice(0, 5);
    dataForPins.forEach(function (item) {
      fragmentPin.appendChild(window.pin.render(item));
    });
  };

  // Добавляет pin--ad из фрагмента
  var addPinAd = function () {
    window.data.deleteElements(mapPins, 'map__pin--ad');
    mapPins.appendChild(fragmentPin);
  };

  // Cортировка по типу жилья
  var housingType = document.getElementById('housing-type');
  housingType.addEventListener('change', function (evt) {
    createPins(filterPinAd(evt, houseCards));
    addPinAd();
  });

  // Уведомление отправки
  var createSuccess = function () {
    var mainPage = document.querySelector('main');
    var successTemplate = document.getElementById('success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);

    successElement.classList.add('notification');

    document.addEventListener('click', window.change.resetHandler);
    document.addEventListener('keydown', window.change.resetHandler);

    mainPage.appendChild(successElement);
  };

  // Уведомление ошибки
  var createError = function (message) {
    var mainPage = document.querySelector('main');
    var errorTemplate = document.getElementById('error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');

    errorElement.classList.add('notification');
    errorMessage.textContent = message;

    errorButton.addEventListener('click', window.change.resetHandler);
    document.addEventListener('keydown', window.change.resetHandler);

    mainPage.appendChild(errorElement);
  };

  // Удалить уведомление
  var deleteNotification = function () {
    var notificationElement = document.querySelector('.notification');
    if (notificationElement) {
      notificationElement.remove();
    }
  };

  // Активация карты
  var activateMap = function (data) {
    houseCards = data; // сохр загр данные
    map.classList.remove('map--faded'); // удал стиль блокир
    createPins(houseCards); // созд фрагмент с pin--ad
    addPinAd(); // добав pin--ad

    window.form.changeDisabled(formFilters, false); // разблок поля форм
  };

  // Сброс карты
  var resetMap = function () {
    window.data.deleteElements(map, 'map__card'); // удал картч объявл
    window.data.deleteElements(mapPins, 'map__pin--ad'); // удал pin--ad
    pinMain.style = ORIGIN_COORDS_PIN_MAIN; // устан в центр pin--ad
    map.classList.add('map--faded'); // доб стиль блокир

    formFilters.reset(); // сброс знач форм
    window.form.changeDisabled(formFilters, true); // заблок поля форм
  };

  window.map = {
    addPinAd: addPinAd,
    createSuccess: createSuccess,
    createError: createError,
    deleteNotification: deleteNotification,
    activateMap: activateMap,
    resetMap: resetMap
  };
})();
