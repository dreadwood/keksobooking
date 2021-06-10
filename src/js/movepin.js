(() => {
  const Coord = {
    MIN_X: -32,
    MAX_X: 1168,
    MIN_Y: 49,
    MAX_Y: 549,
  };

  const pinMain = document.querySelector('.map__pin--main');

  pinMain.addEventListener('mousedown', (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    const mouseMoveHandler = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      const currentY = pinMain.offsetTop - shift.y;
      const currentX = pinMain.offsetLeft - shift.x;

      const getPinMainCoord = (current, max, min) => {
        let currentCoord;
        if (current > max) {
          currentCoord = max;
        } else if (current < min) {
          currentCoord = min;
        } else {
          currentCoord = current;
        }
        return currentCoord;
      };

      pinMain.style.top = getPinMainCoord(currentY, Coord.MAX_Y, Coord.MIN_Y) + 'px';
      pinMain.style.left = getPinMainCoord(currentX, Coord.MAX_X, Coord.MIN_X) + 'px';

      window.form.getAddress();
    };

    const mouseUpHandler = (upEvt) => {
      upEvt.preventDefault();

      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
  });
})();
