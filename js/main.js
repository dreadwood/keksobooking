'use strict';

// Поиск случайного целого числа
var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// 1 Задание
var getHousingOptions = function () {
  var mockHouse = {
    author: {
      avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png'
    },

    offer: {
      title: 'Новая метка', // заголовок предложения
      address: '600, 350', // x и y
      price: 0,
      type: 'flat', // варианты palace, house, bungalo
      rooms: 1,
      guests: 1,
      checkin: '14: 00', // варианты 12: 00 или 13: 00
      checkout: '12: 00', // варианты 13: 00 или 14: 00
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'], // возможен массив любой длины из предложенных
      description: '', // описание
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

  var quantityOfHouses = 8;
  var arrayHouse = [];
  for (var i = 0; i < quantityOfHouses; i++) {
    arrayHouse[i] = mockHouse;
  }

  return arrayHouse;
};

// 2 Задание
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// 3 Задание
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.getElementById('pin').content.querySelector('.map__pin');

var renderPins = function (pin) {
  var pinsElement = pinTemplate.cloneNode(true);

  pinsElement.style = 'left: ' + (pin.location.x - 25) + 'px; top: ' + (pin.location.y - 70) + 'px;';
  pinsElement.querySelector('img').src = pin.author.avatar;
  pinsElement.querySelector('img').alt = pin.offer.title;

  return pinsElement;
};

// 4 Задание
var fragment = document.createDocumentFragment();
for (var i = 0; i < getHousingOptions().length; i++) {
  fragment.appendChild(renderPins(getHousingOptions()[i]));
}

mapPins.appendChild(fragment);
