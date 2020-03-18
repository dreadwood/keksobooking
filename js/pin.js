'use strict';

(function () {
  var HALF = 2;
  var POINTER_MAIN_HEIGHT = 16;
  var POINTER_PIN_WIDTH = 50;
  var POINTER_PIN_HEIGHT = 70;

  var pinMain = document.querySelector('.map__pin--main');

  // Создание шаблона для отрисовки меток
  var renderPins = function (dataItem) {
    var map = document.querySelector('.map');
    var mapPins = document.querySelector('.map__pins');
    var pinTemplate = document.getElementById('pin').content.querySelector('.map__pin');
    var pinsElement = pinTemplate.cloneNode(true);

    pinsElement.classList.add('map__pin--ad');
    pinsElement.style = 'left: ' + (dataItem.location.x - POINTER_PIN_WIDTH / 2) + 'px; top: ' + (dataItem.location.y - POINTER_PIN_HEIGHT) + 'px;';
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
    coordsOfCenterMain: getPinCoordsCenter,
    coordsOfPointerMain: getPinCoordsPointer,
    resetStatus: resetStatusPin
  };
})();
