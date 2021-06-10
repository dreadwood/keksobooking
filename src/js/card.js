(() => {
  const HousingType = {
    FLAT: 'Квартира',
    PALACE: 'Дворец',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало',
  };
  const cartTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // создание шаблона для карточки предложения
  const renderCard = (card) => {
    const featuresOfHouse = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    const cardElement = cartTemplate.cloneNode(true);
    const closeButton = cardElement.querySelector('.popup__close');
    const cardFirstPhotoElement = cardElement.querySelector('.popup__photo');

    // аватарка попапа
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    // title
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    // адрес
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    // цена
    cardElement.querySelector('.popup__text--price').childNodes[0].textContent = card.offer.price + '₽';
    // тип жилья
    cardElement.querySelector('.popup__type').textContent = HousingType[card.offer.type];
    // колличество гостей и комнат
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    // время заезда и выезда
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    // удобства
    featuresOfHouse.forEach((feature) => {
      if (!card.offer.features.includes(feature)) {
        cardElement.querySelector('.popup__feature--' + feature).remove();
      }
    });
    // описание
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    // фото
    if (card.offer.photos.length > 0) {
      cardFirstPhotoElement.src = card.offer.photos[0];
      card.offer.photos.forEach((photo, index) => {
        if (index > 0) {
          const cardPhotoElement = cardFirstPhotoElement.cloneNode(true);
          cardPhotoElement.src = photo;
          cardElement.querySelector('.popup__photos').appendChild(cardPhotoElement);
        }
      });
    } else {
      cardFirstPhotoElement.remove();
    }

    const cardEscPressHandler = (evt) => {
      window.util.isEscEvent(evt, closeCard);
    };

    const cardCloseClickHandler = (evt) => {
      window.util.isLeftButtonEvent(evt, closeCard);
    };

    // закрытие карточки
    const closeCard = () => {
      closeButton.removeEventListener('click', cardCloseClickHandler);
      document.removeEventListener('keydown', cardEscPressHandler);

      cardElement.remove();
      window.pin.resetStatus();
    };

    closeButton.addEventListener('click', cardCloseClickHandler);
    document.addEventListener('keydown', cardEscPressHandler);

    return cardElement;
  };

  window.card = {
    render: renderCard,
  };
})();
