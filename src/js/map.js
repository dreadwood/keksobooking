(() => {
  const ORIGIN_COORDS_PIN_MAIN = 'left: 570px; top: 375px;';
  const MAX_PINS_AD = 10;
  const Price = {
    LOW: 10000,
    HIGH: 50000,
  };
  const NamePrice = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
  };

  let houseCards; // массив загруж данных
  let sortedArray; // массив сорт данных
  let currentFilter = {}; // акт фильтры

  const map = document.querySelector('.map');
  const mapPins = map.querySelector('.map__pins');
  const pinMain = map.querySelector('.map__pin--main');
  const filters = map.querySelector('.map__filters');
  const selectFilters = filters.querySelectorAll('select');
  const housingFeatures = map.querySelector('#housing-features');
  const checkboxFilters = housingFeatures.querySelectorAll('input');

  const fragmentPin = document.createDocumentFragment(); // фрагм отрисовк

  // создать фрагмент с pin--ad
  const createPins = (data) => {
    const dataForPins = data.slice(0, MAX_PINS_AD);
    dataForPins.forEach((item) => {
      fragmentPin.appendChild(window.pin.render(item));
    });
  };

  // добавляет pin--ad из фрагмента
  const addPinAd = () => {
    window.util.deleteElements(mapPins, 'map__pin--ad');
    window.util.deleteElements(map, 'map__card');
    mapPins.appendChild(fragmentPin);
  };

  // фильтр типа жилья, кол-во комнат, гостей
  const filterVariousFields = (typeFilter) => {
    if (currentFilter[typeFilter] !== 'any') {
      sortedArray = sortedArray.filter((ad) => {
        return currentFilter[typeFilter] === String(ad.offer[typeFilter]);
      });
    }
  };

  // фильтр цены
  const filterPrice = () => {
    if (currentFilter.price === NamePrice.LOW) {
      sortedArray = sortedArray.filter((ad) => {
        return ad.offer.price < Price.LOW;
      });
    } else if (currentFilter.price === NamePrice.HIGH) {
      sortedArray = sortedArray.filter((ad) => {
        return ad.offer.price > Price.HIGH;
      });
    } else if (currentFilter.price === NamePrice.MIDDLE) {
      sortedArray = sortedArray.filter((ad) => {
        return ad.offer.price >= Price.LOW && ad.offer.price <= Price.HIGH;
      });
    }
  };

  // фильтер удобств
  const filterFeatures = () => {
    if (currentFilter.features.length > 0) {
      currentFilter.features.forEach((itemFilter) => {
        sortedArray = sortedArray.filter((ad) => {
          return ad.offer.features.indexOf(itemFilter) > -1;
        });
      });
    }
  };

  const getCurrentFilters = () => {
    selectFilters.forEach((itemFilter) => {
      const indexCut = itemFilter.name.indexOf('-') + 1;
      currentFilter[itemFilter.name.slice(indexCut)] = itemFilter.value;
    });

    currentFilter.features = Array.from(checkboxFilters).reduce((result, itemFilter) => {
      if (itemFilter.checked) {
        result.push(itemFilter.value);
      }
      return result;
    }, []);
  };

  // изменение формы фильтров
  filters.addEventListener('change', () => {
    getCurrentFilters();
    sortedArray = houseCards;
    filterVariousFields('type');
    filterPrice();
    filterVariousFields('rooms');
    filterVariousFields('guests');
    filterFeatures();
    createPins(sortedArray);

    window.util.debounce(addPinAd);
  });

  // уведомление отправки
  const createSuccess = () => {
    const mainPage = document.querySelector('main');
    const successTemplate = document.querySelector('#success').content.querySelector('.success');
    const successElement = successTemplate.cloneNode(true);

    successElement.classList.add('notification');

    document.addEventListener('mousedown', window.change.pageClickHandler);
    document.addEventListener('keydown', window.change.pageEscPressHandler);

    mainPage.appendChild(successElement);
  };

  // сброс страницы
  const buttonNotificationClickHandler = (evt) => {
    window.util.isLeftButtonEvent(evt, window.change.resetPage);
  };

  // уведомление ошибки
  const createError = (message) => {
    const mainPage = document.querySelector('main');
    const errorTemplate = document.querySelector('#error').content.querySelector('.error');
    const errorElement = errorTemplate.cloneNode(true);
    const errorMessage = errorElement.querySelector('.error__message');
    const errorButton = errorElement.querySelector('.error__button');

    errorElement.classList.add('notification');
    errorMessage.textContent = message;

    errorButton.addEventListener('mousedown', buttonNotificationClickHandler);
    document.addEventListener('keydown', window.change.pageClickHandler);

    mainPage.appendChild(errorElement);
  };

  // удалить уведомление
  const deleteNotification = () => {
    const notification = document.querySelector('.notification');
    if (notification) {
      notification.remove();
    }
  };

  // активация карты
  const activateMap = (data) => {
    houseCards = data; // сохр загр данные
    map.classList.remove('map--faded'); // удал стиль блокир
    createPins(houseCards); // созд фрагмент с pin--ad
    addPinAd(); // добав pin--ad

    window.form.changeDisabled(filters, false); // разблок поля форм
  };

  // сброс карты
  const resetMap = () => {
    window.util.deleteElements(map, 'map__card'); // удал картч объявл
    window.util.deleteElements(mapPins, 'map__pin--ad'); // удал pin--ad
    pinMain.style = ORIGIN_COORDS_PIN_MAIN; // устан в центр pin--ad
    map.classList.add('map--faded'); // доб стиль блокир

    filters.reset(); // сброс знач форм
    window.form.changeDisabled(filters, true); // заблок поля форм
  };

  window.map = {
    addPinAd: addPinAd,
    createSuccess: createSuccess,
    createError: createError,
    deleteNotification: deleteNotification,
    activate: activateMap,
    reset: resetMap,
  };
})();
