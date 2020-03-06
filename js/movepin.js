'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var COORDS = {
      MIN_X: -32,
      MAX_X: 1168,
      MIN_Y: 130,
      MAX_Y: 630
    };

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentY = pinMain.offsetTop - shift.y;
      var currentX = pinMain.offsetLeft - shift.x;

      var getPinMainCoord = function (current, max, min) {
        var currentCoord;
        if (current > max) {
          currentCoord = max;
        } else if (current < min) {
          currentCoord = min;
        } else {
          currentCoord = current;
        }
        return currentCoord;
      };

      pinMain.style.top = getPinMainCoord(currentY, COORDS.MAX_Y, COORDS.MIN_Y) + 'px';
      pinMain.style.left = getPinMainCoord(currentX, COORDS.MAX_X, COORDS.MIN_X) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
