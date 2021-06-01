'use strict';

(function () {
  var HALF = 2;
  var POINTER_MAIN_HEIGHT = 16;
  var POINTER_PIN_WIDTH = 50;
  var POINTER_PIN_HEIGHT = 70;
  var LOC_ITEMS = {
    MIN_LAT: 35.30000,
    MAX_LAT: 36.30000,
    MIN_LNG: 139.10000,
    MAX_LNG: 140.20000,
    DELTA_LAT: 1.0000,
    DELTA_LNG: 1.1000,
    MAX_X: 1200,
    MAX_Y: 630,
  };

  // адаптер для перевода широты и высоты в единицы полотна по старому ТЗ
  var adapterLocation = function (lat, lng) {
    var x = (lat - LOC_ITEMS.MIN_LAT) / LOC_ITEMS.DELTA_LAT * LOC_ITEMS.MAX_X;
    var y = (lng - LOC_ITEMS.MIN_LNG) / LOC_ITEMS.DELTA_LNG * LOC_ITEMS.MAX_Y;
    return {x: x, y: y};
  };

  var pinMain = document.querySelector('.map__pin--main');

  // Создание шаблона для отрисовки меток
  var renderPins = function (dataItem) {
    var map = document.querySelector('.map');
    var mapPins = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinsElement = pinTemplate.cloneNode(true);

    // применения адаптера для местоположения pin
    var location = adapterLocation(dataItem.location.lat, dataItem.location.lng);

    pinsElement.classList.add('map__pin--ad');
    pinsElement.style = 'left: ' + (location.x - POINTER_PIN_WIDTH / 2) + 'px; top: ' + (location.y - POINTER_PIN_HEIGHT) + 'px;';
    pinsElement.querySelector('img').src = dataItem.author.avatar;
    pinsElement.querySelector('img').alt = dataItem.offer.title;

    // Обработчик для отрисовки карточки похожего обявления
    pinsElement.addEventListener('click', function () {
      window.util.deleteElements(map, 'map__card');
      resetStatusPin();
      mapPins.after(window.card.render(dataItem));
      pinsElement.classList.add('map__pin--active');
    });

    return pinsElement;
  };

  // Удаление active с pin
  var resetStatusPin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // Нахождения кординат центра pin--main
  var getPinCoordsCenter = function () {
    var coords = {
      x: pinMain.offsetLeft + Math.floor(pinMain.offsetWidth / HALF),
      y: pinMain.offsetTop + Math.floor(pinMain.offsetHeight / HALF)
    };
    return coords.x + ', ' + coords.y;
  };

  // Нахождения кординат указателя pin--main
  var getPinCoordsPointer = function () {
    var coords = {
      x: pinMain.offsetLeft + Math.floor(pinMain.offsetWidth / HALF),
      y: pinMain.offsetTop + pinMain.offsetHeight + POINTER_MAIN_HEIGHT
    };
    return coords.x + ', ' + coords.y;
  };

  window.pin = {
    render: renderPins,
    getCoordsOfCenterMain: getPinCoordsCenter,
    getCoordsOfPointerMain: getPinCoordsPointer,
    resetStatus: resetStatusPin
  };
})();
