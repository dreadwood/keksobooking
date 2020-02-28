'use strict';

(function () {
  // Создание элементов pins
  var fragmentPin = document.createDocumentFragment();

  var createPins = function (data) {
    var houseCards = data;

    for (var i = 0; i < houseCards.length; i++) {
      fragmentPin.appendChild(window.pin.renderPins(houseCards[i]));
    }
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

  // // Вставка шаблона карточки предложения на страницу
  // mapPins.after(window.card.renderCard(houseCards[0]));

  window.backend.load(createPins, createError);

  window.map = {
    fragmentPin: fragmentPin
  };
})();
