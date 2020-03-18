'use strict';

(function () {
  var HousingType = {
    FLAT: 'Квартира',
    PALACE: 'Дворец',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };
  var cartTemplate = document.getElementById('card').content.querySelector('.map__card');

  // Создание шаблона для карточки предложения
  var renderCard = function (card) {
    var featuresOfHouse = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var cardElement = cartTemplate.cloneNode(true);
    var closeButton = cardElement.querySelector('.popup__close');
    var cardFirstPhotoElement = cardElement.querySelector('.popup__photo');

    // Аватарка попапа
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    // Title
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    // Адрес
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    // Цена
    cardElement.querySelector('.popup__text--price').childNodes[0].textContent = card.offer.price + '₽';
    // Тип жилья
    cardElement.querySelector('.popup__type').textContent = HousingType[card.offer.type];
    // Колличество гостей и комнат
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    // Время заезда и выезда
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    // Удобства
    featuresOfHouse.forEach(function (feature) {
      if (card.offer.features.includes(feature) === false) {
        cardElement.querySelector('.popup__feature--' + feature).remove();
      }
    });
    // Описание
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    // Фото
    if (card.offer.photos.length > 0) {
      cardFirstPhotoElement.src = card.offer.photos[0];
      card.offer.photos.forEach(function (photo, index) {
        if (index > 0) {
          var cardPhotoElement = cardFirstPhotoElement.cloneNode(true);
          cardPhotoElement.src = photo;
          cardElement.querySelector('.popup__photos').appendChild(cardPhotoElement);
        }
      });
    } else {
      cardFirstPhotoElement.remove();
    }

    var cardCloseHandler = function (evt) {
      window.util.isLeftButtonEvent(evt, closeCard);
      window.util.isEnterEvent(evt, closeCard);
      window.util.isEscEvent(evt, closeCard);
    };

    // Закрытие карточки
    var closeCard = function () {
      closeButton.removeEventListener('click', cardCloseHandler);
      document.removeEventListener('keydown', cardCloseHandler);

      cardElement.remove();
      window.pin.resetStatus();
    };

    closeButton.addEventListener('click', cardCloseHandler);
    document.addEventListener('keydown', cardCloseHandler);

    return cardElement;
  };

  window.card = {
    render: renderCard
  };
})();
