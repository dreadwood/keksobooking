'use strict';

(function () {

  var HALF = 2;
  var POINTER_MAIN_HEIGHT = 16;
  var POINTER_PIN_WIDTH = 50;
  var POINTER_PIN_HEIGHT = 70;

  // Создание шаблона для отрисовки меток
  var pinTemplate = document.getElementById('pin').content.querySelector('.map__pin');

  var renderPins = function (dataItem) {
    var pinsElement = pinTemplate.cloneNode(true);

    pinsElement.classList.add('map__pin--ad');
    pinsElement.style = 'left: ' + (dataItem.location.x - POINTER_PIN_WIDTH / 2) + 'px; top: ' + (dataItem.location.y - POINTER_PIN_HEIGHT) + 'px;';
    pinsElement.querySelector('img').src = dataItem.author.avatar;
    pinsElement.querySelector('img').alt = dataItem.offer.title;


    // Обработчик для отрисовки карточки похожего обявления
    var map = document.querySelector('.map');
    var mapPins = document.querySelector('.map__pins');

    pinsElement.addEventListener('click', function () {
      window.map.deleteElements(map, 'map__card');
      resetStatusPin();
      mapPins.after(window.card.renderCard(dataItem));
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
  var getPinCoordsCenter = function (pinMain) {
    var coords = {
      x: pinMain.offsetLeft + Math.floor(pinMain.offsetWidth / HALF),
      y: pinMain.offsetTop + Math.floor(pinMain.offsetHeight / HALF)
    };
    return coords.x + ', ' + coords.y;
  };

  // Нахождения кординат указателя pin--main
  var getPinCoordsPointer = function (pinMain) {
    var coords = {
      x: pinMain.offsetLeft + Math.floor(pinMain.offsetWidth / HALF),
      y: pinMain.offsetTop + pinMain.offsetHeight + POINTER_MAIN_HEIGHT
    };
    return coords.x + ', ' + coords.y;
  };

  window.pin = {
    render: renderPins,
    getPinCoordsCenter: getPinCoordsCenter,
    getPinCoordsPointer: getPinCoordsPointer,
    resetStatus: resetStatusPin
  };
})();
