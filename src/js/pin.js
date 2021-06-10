(() => {
  const HALF = 2;
  const POINTER_MAIN_HEIGHT = 16;
  const POINTER_PIN_WIDTH = 50;
  const POINTER_PIN_HEIGHT = 70;
  const LocItems = {
    MIN_LAT: 35.30000,
    MAX_LAT: 36.30000,
    MIN_LNG: 139.10000,
    MAX_LNG: 140.20000,
    DELTA_LAT: 1.0000,
    DELTA_LNG: 1.1000,
    MAX_X: 1200,
    MAX_Y: 630,
  };

  const pinMain = document.querySelector('.map__pin--main');

  // адаптер для перевода широты и высоты в единицы полотна по старому ТЗ
  const adapterLocation = (lat, lng) => {
    const x = (lat - LocItems.MIN_LAT) / LocItems.DELTA_LAT * LocItems.MAX_X;
    const y = (lng - LocItems.MIN_LNG) / LocItems.DELTA_LNG * LocItems.MAX_Y;
    return {x: x, y: y};
  };

  // создание шаблона для отрисовки меток
  const renderPins = (dataItem) => {
    const map = document.querySelector('.map');
    const mapPins = document.querySelector('.map__pins');
    const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    const pinsElement = pinTemplate.cloneNode(true);

    // применения адаптера для местоположения pin
    const location = adapterLocation(dataItem.location.lat, dataItem.location.lng);

    pinsElement.classList.add('map__pin--ad');
    pinsElement.style = 'left: ' + (location.x - POINTER_PIN_WIDTH / 2) + 'px; top: ' + (location.y - POINTER_PIN_HEIGHT) + 'px;';
    pinsElement.querySelector('img').src = dataItem.author.avatar;
    pinsElement.querySelector('img').alt = dataItem.offer.title;

    // обработчик для отрисовки карточки похожего обявления
    pinsElement.addEventListener('click', () => {
      window.util.deleteElements(map, 'map__card');
      resetStatusPin();
      mapPins.after(window.card.render(dataItem));
      pinsElement.classList.add('map__pin--active');
    });

    return pinsElement;
  };

  // удаление active с pin
  const resetStatusPin = () => {
    const activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // нахождения кординат центра pin--main
  const getPinCoordsCenter = () => {
    const coords = {
      x: pinMain.offsetLeft + Math.floor(pinMain.offsetWidth / HALF),
      y: pinMain.offsetTop + Math.floor(pinMain.offsetHeight / HALF),
    };
    return coords.x + ', ' + coords.y;
  };

  // нахождения кординат указателя pin--main
  const getPinCoordsPointer = () => {
    const coords = {
      x: pinMain.offsetLeft + Math.floor(pinMain.offsetWidth / HALF),
      y: pinMain.offsetTop + pinMain.offsetHeight + POINTER_MAIN_HEIGHT,
    };
    return coords.x + ', ' + coords.y;
  };

  window.pin = {
    render: renderPins,
    getCoordsOfCenterMain: getPinCoordsCenter,
    getCoordsOfPointerMain: getPinCoordsPointer,
    resetStatus: resetStatusPin,
  };
})();
