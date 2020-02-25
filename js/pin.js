'use strict';

(function () {

  var HALF = 2;
  var POINTER_HEIGHT = 16;

  // Создание шаблона для отрисовки меток
  var pinTemplate = document.getElementById('pin').content.querySelector('.map__pin');

  var renderPins = function (pin) {
    var pinsElement = pinTemplate.cloneNode(true);

    pinsElement.style = 'left: ' + (pin.location.x - 25) + 'px; top: ' + (pin.location.y - 70) + 'px;';
    pinsElement.querySelector('img').src = pin.author.avatar;
    pinsElement.querySelector('img').alt = pin.offer.title;

    return pinsElement;
  };

  // Нахождения кординат центра pin--main
  var getPinCoordsCenter = function (pin) {
    var coords = {
      x: pin.offsetLeft + Math.floor(pin.offsetWidth / HALF),
      y: pin.offsetTop + Math.floor(pin.offsetHeight / HALF)
    };
    return coords.x + ', ' + coords.y;
  };

  // Нахождения кординат указателя pin--main
  var getPinCoordsPointer = function (pin) {
    var coords = {
      x: pin.offsetLeft + Math.floor(pin.offsetWidth / HALF),
      y: pin.offsetTop + pin.offsetHeight + POINTER_HEIGHT
    };
    return coords.x + ', ' + coords.y;
  };

  window.pin = {
    renderPins: renderPins,
    getPinCoordsCenter: getPinCoordsCenter,
    getPinCoordsPointer: getPinCoordsPointer
  };
})();
