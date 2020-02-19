'use strict';

// Поиск случайного целого числа
var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// module3-task2 - Задание 1
var quantityOfHouses = 8;

// Создание мока
var getMockHouse = function (counter) {
  var mockHouse = {
    author: {
      avatar: 'img/avatars/user0' + (counter + 1) + '.png'
    },

    offer: {
      title: 'Уютная стильная мансарда с камином', // заголовок предложения
      address: '600, 350', // x и y
      price: getRandomInteger(1000, 9999),
      type: 'flat', // варианты flat, palace, house, bungalo
      rooms: getRandomInteger(1, 4),
      guests: getRandomInteger(1, 4),
      checkin: '14:00', // варианты 12:00, 13:00 или 14:00
      checkout: '12:00', // варианты 12:00, 13:00 или 14:00
      features: ['wifi', 'parking', 'washer', 'conditioner'], // возможен массив любой длины из 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'
      description: 'Поднимитесь в эту старинную мансарду, чтобы ощутить тишину и покой после прогулок по историческому центру города. Мягкий утренний свет и забавные блики заката проникают через большие окна в эту светлую квартиру с оригинальной отделкой.', // описание
      photos: [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      ] // возможен массив любой длины
    },

    location: {
      x: getRandomInteger(50, 1150), // случайное число, от 50 до 1150
      y: getRandomInteger(130, 630) // случайное число, от 130 до 630
    }
  };

  return mockHouse;
};

// Создание массивов с моками
var getArrayHouse = function () {
  var arrayHouse = [];
  for (var i = 0; i < quantityOfHouses; i++) {
    arrayHouse[i] = getMockHouse(i);
  }

  return arrayHouse;
};


// module3-task2 - Задание 2
// Переключение в активное состояние карты
var map = document.querySelector('.map');
// map.classList.remove('map--faded');


// module3-task2 - Задание 3
// Создание шаблона для отрисовки меток
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.getElementById('pin').content.querySelector('.map__pin');

var renderPins = function (pin) {
  var pinsElement = pinTemplate.cloneNode(true);

  pinsElement.style = 'left: ' + (pin.location.x - 25) + 'px; top: ' + (pin.location.y - 70) + 'px;';
  pinsElement.querySelector('img').src = pin.author.avatar;
  pinsElement.querySelector('img').alt = pin.offer.title;

  return pinsElement;
};


// module3-task2 - Задание 4
// Добавление меток на карту
var fragment = document.createDocumentFragment();
var houseCards = getArrayHouse();
for (var i = 0; i < houseCards.length; i++) {
  fragment.appendChild(renderPins(houseCards[i]));
}
// mapPins.appendChild(fragment);


// // module3-task3 - Задание 2
// var cartTemplate = document.getElementById('card').content.querySelector('.map__card');

// Создание шаблона для карточки предложения
// var renderCard = function (card) {
//   var cardElement = cartTemplate.cloneNode(true);

//   // Аватарка попапа
//   cardElement.querySelector('.popup__avatar').src = card.author.avatar;
//   // Title
//   cardElement.querySelector('.popup__title').textContent = card.offer.title;
//   // Адрес
//   cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
//   // Цена
//   cardElement.querySelector('.popup__text--price').childNodes[0].textContent = card.offer.price + '₽';
//   // Тип жилья
//   var typeHouses = {
//     flat: 'Квартира',
//     palace: 'Дворец',
//     house: 'Дом',
//     bungalo: 'Бунгало'
//   };
//   cardElement.querySelector('.popup__type').textContent = typeHouses[card.offer.type];
//   // Колличество гостей и комнат
//   cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
//   // Время заезда и выезда
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
//   // Удобства
//   var featuresOfHouse = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
//   for (var k = 0; k < featuresOfHouse.length; k++) {
//     if (card.offer.features.includes(featuresOfHouse[k]) === false) {
//       cardElement.querySelector('.popup__feature--' + featuresOfHouse[k]).remove();
//     }
//   }
//   // Описание
//   cardElement.querySelector('.popup__description').textContent = card.offer.description;
//   // Фото
//   var cardFirstPhotoElement = cardElement.querySelector('.popup__photo');
//   cardFirstPhotoElement.src = card.offer.photos[0];
//   for (var j = 1; j < card.offer.photos.length; j++) {
//     var cardPhotoElement = cardFirstPhotoElement.cloneNode(true);
//     cardPhotoElement.src = card.offer.photos[j];
//     cardElement.querySelector('.popup__photos').appendChild(cardPhotoElement);
//   }

//   return cardElement;
// };


// // module3-task3 - Задание 3
// // Вставка шаблона карточки предложения на страницу
// mapPins.after(renderCard(houseCards[0]));


// module4-task2
var formAd = document.querySelector('.ad-form');
var mapPinMain = map.querySelector('.map__pin--main');
var addressFormAd = formAd.querySelector('#address');
var numberOfRoomsFormAd = formAd.querySelector('#room_number');
var capacityRoomFormAd = formAd.querySelector('#capacity');

var HALF = 2;
var POINTER_HEIGHT = 16;

var ENTER_KEY = 'Enter';
var LEFT_MOUSE_BUTTON = 0;

// Заблокировать поля формы
var changeDisabledFieldset = function (form, boolean) {
  var fieldsetOfForm = form.querySelectorAll('fieldset');
  if (boolean === true) {
    for (var j = 0; j < fieldsetOfForm.length; j++) {
      fieldsetOfForm[j].setAttribute('disabled', '');
    }
  } else {
    for (var k = 0; k < fieldsetOfForm.length; k++) {
      fieldsetOfForm[k].removeAttribute('disabled');
    }
  }
};

// Нахождения кординат центра pin--main
var getPinCoordsCenter = function (pin) {
  var coords = {
    x: pin.offsetLeft + Math.floor(pin.offsetWidth / HALF),
    y: pin.offsetTop + Math.floor(pin.offsetHeight / HALF)
  };
  return coords.x + ', ' + coords.y;
};

// Нахождения кординат указателя pin--main
var getPinCoordsPointer = function (pin) {
  var coords = {
    x: pin.offsetLeft + Math.floor(pin.offsetWidth / HALF),
    y: pin.offsetTop + pin.offsetHeight + POINTER_HEIGHT
  };
  return coords.x + ', ' + coords.y;
};


// Включние неактивного состояния
changeDisabledFieldset(formAd, true);
addressFormAd.defaultValue = getPinCoordsCenter(mapPinMain);

var activatePage = function () {
  map.classList.remove('map--faded');
  formAd.classList.remove('ad-form--disabled');
  changeDisabledFieldset(formAd, false);
};


// Включние активного состояния
mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    activatePage();
    addressFormAd.defaultValue = getPinCoordsPointer(mapPinMain);
    mapPins.appendChild(fragment);
    evt.preventDefault();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
    addressFormAd.defaultValue = getPinCoordsPointer(mapPinMain);
    mapPins.appendChild(fragment);
    evt.preventDefault();
  }
});


// Добавление адреса для отправки формы
formAd.setAttribute('action', 'https://js.dump.academy/keksobooking');

// Валидация полей комнат и гостей при отправке формы
var myFunc = function () {
  if (Number(numberOfRoomsFormAd.value) < Number(capacityRoomFormAd.value)) {
    numberOfRoomsFormAd.setCustomValidity('Колличество комнат должно равняться колличеству гостей');
  } else {
    numberOfRoomsFormAd.setCustomValidity('');
  }
};

formAd.addEventListener('submit', function (evt) {
  evt.preventDefault();
  myFunc();
});

