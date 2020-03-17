'use strict';

(function () {
  var coords = {
    MIN_X: -32,
    MAX_X: 1168,
    MIN_Y: 49,
    MAX_Y: 549
  };

  var pinMain = document.querySelector('.map__pin--main');

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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

      pinMain.style.top = getPinMainCoord(currentY, coords.MAX_Y, coords.MIN_Y) + 'px';
      pinMain.style.left = getPinMainCoord(currentX, coords.MAX_X, coords.MIN_X) + 'px';

      window.form.address();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });
})();
