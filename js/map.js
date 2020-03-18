'use strict';

(function () {
  var ORIGIN_COORDS_PIN_MAIN = 'left: 570px; top: 375px;';
  var MAX_PINS_AD = 5;
  var Price = {
    LOW: 10000,
    HIGH: 50000
  };
  var NamePrice = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinMain = map.querySelector('.map__pin--main');
  var filters = map.querySelector('.map__filters');
  var selectFilters = filters.querySelectorAll('select');
  var housingFeatures = document.getElementById('housing-features');
  var checkboxFilters = housingFeatures.querySelectorAll('input');
  var houseCards; // массив загруж данных
  var sortedArray; // массив сорт данных
  var currentFilter = {}; // акт фильтры
  var fragmentPin = document.createDocumentFragment(); // фрагм отрисовк

  // Cоздать фрагмент с pin--ad
  var createPins = function (data) {
    var dataForPins = data.slice(0, MAX_PINS_AD);
    dataForPins.forEach(function (item) {
      fragmentPin.appendChild(window.pin.render(item));
    });
  };

  // Добавляет pin--ad из фрагмента
  var addPinAd = function () {
    window.util.deleteElements(mapPins, 'map__pin--ad');
    window.util.deleteElements(map, 'map__card');
    mapPins.appendChild(fragmentPin);
  };

  // Фильтр типа жилья, кол-во комнат, гостей
  var filterVariousFields = function (typeFilter) {
    if (currentFilter[typeFilter] !== 'any') {
      sortedArray = sortedArray.filter(function (ad) {
        return currentFilter[typeFilter] === String(ad.offer[typeFilter]);
      });
    }
  };

  // Фильтр цены
  var filterPrice = function () {
    if (currentFilter.price === NamePrice.LOW) {
      sortedArray = sortedArray.filter(function (ad) {
        return ad.offer.price < Price.low;
      });
    } else if (currentFilter.price === NamePrice.HIGH) {
      sortedArray = sortedArray.filter(function (ad) {
        return ad.offer.price > Price.high;
      });
    } else if (currentFilter.price === NamePrice.MIDDLE) {
      sortedArray = sortedArray.filter(function (ad) {
        return ad.offer.price > Price.low && ad.offer.price < Price.high;
      });
    }
  };

  // Фильтер удобств
  var filterFeatures = function () {
    if (currentFilter.features.length > 0) {
      currentFilter.features.forEach(function (itemFilter) {
        sortedArray = sortedArray.filter(function (ad) {
          return ad.offer.features.indexOf(itemFilter) > -1;
        });
      });
    }
  };

  var getCurrentFilters = function () {
    selectFilters.forEach(function (itemFilter) {
      var indexCut = itemFilter.name.indexOf('-') + 1;
      currentFilter[itemFilter.name.slice(indexCut)] = itemFilter.value;
    });

    currentFilter.features = [];
    checkboxFilters.forEach(function (itemFilter) {
      if (itemFilter.checked === true) {
        currentFilter.features.push(itemFilter.value);
      }
    });
  };

  // Изменение формы фильтров
  filters.addEventListener('change', function () {
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

  // Уведомление отправки
  var createSuccess = function () {
    var mainPage = document.querySelector('main');
    var successTemplate = document.getElementById('success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);

    successElement.classList.add('notification');

    document.addEventListener('click', window.change.pageResetHandler);
    document.addEventListener('keydown', window.change.pageResetHandler);

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

    errorButton.addEventListener('click', window.change.pageResetHandler);
    document.addEventListener('keydown', window.change.pageResetHandler);

    mainPage.appendChild(errorElement);
  };

  // Удалить уведомление
  var deleteNotification = function () {
    var notification = document.querySelector('.notification');
    if (notification) {
      notification.remove();
    }
  };

  // Активация карты
  var activateMap = function (data) {
    houseCards = data; // сохр загр данные
    map.classList.remove('map--faded'); // удал стиль блокир
    createPins(houseCards); // созд фрагмент с pin--ad
    addPinAd(); // добав pin--ad

    window.form.changeDisabled(filters, false); // разблок поля форм
  };

  // Сброс карты
  var resetMap = function () {
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
    reset: resetMap
  };
})();
