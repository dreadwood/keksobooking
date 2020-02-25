'use strict';

(function () {
  // Создание элементов pins
  var fragmentPin = document.createDocumentFragment();

  var houseCards = window.data.getArrayHouse();
  for (var i = 0; i < houseCards.length; i++) {
    fragmentPin.appendChild(window.pin.renderPins(houseCards[i]));
  }

  // // Вставка шаблона карточки предложения на страницу
  // mapPins.after(window.card.renderCard(houseCards[0]));

  window.map = {
    fragmentPin: fragmentPin
  };
})();
