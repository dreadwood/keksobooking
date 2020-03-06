'use strict';

(function () {
  var fragmentPin = document.createDocumentFragment();

  // Удаляет все дочерные элементы с определенным классом (Pin-Ad с карты)
  var deleteElements = function (node, className) {
    var elementsArrayForRemove = node.querySelectorAll('.' + className);
    elementsArrayForRemove.forEach(function (element) {
      element.remove();
    });
  };

  // Добавляет Pin-Ad на карту из фрагмента
  var addPinAd = function () {
    var mapPins = document.querySelector('.map__pins');
    deleteElements(mapPins, 'map__pin--ad');
    mapPins.appendChild(fragmentPin);
  };

  var filterPinAd = function (event, array) {
    var sortedArray;
    if (event.target.value === 'any') {
      sortedArray = array;
    } else {
      sortedArray = array.filter(function (a) {
        return a.offer.type === event.target.value;
      });
    }
    return sortedArray;
  };

  // Обработчик для сортировки
  var housingType = document.getElementById('housing-type');
  housingType.addEventListener('change', function (evt) {
    createPins(filterPinAd(evt, houseCards));
    addPinAd(fragmentPin);
  });

  var createPins = function (data) {
    var dataForPins = data.slice(0, 5);
    dataForPins.forEach(function (item) {
      fragmentPin.appendChild(window.pin.render(item));
    });
  };

  var createError = function (message) {
    var mainPage = document.querySelector('main');
    var errorTemplate = document.getElementById('error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');

    errorMessage.textContent = message;

    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      document.location.reload(true);
    });

    mainPage.appendChild(errorElement);
  };

  // Массив для хранинеия данных с сервера
  var houseCards;

  // Успешная загрузка данных с сервера
  var successHandler = function (data) {
    houseCards = data;
    createPins(houseCards);
  };

  window.backend.load(successHandler, createError);

  window.map = {
    addPinAd: addPinAd,
    deleteElements: deleteElements
  };
})();
