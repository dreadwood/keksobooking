'use strict';

(function () {
  // Поиск случайного целого числа
  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  // Создание мока
  var QUANTITY_OF_HOUSES = 8;

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
    for (var i = 0; i < QUANTITY_OF_HOUSES; i++) {
      arrayHouse[i] = getMockHouse(i);
    }

    return arrayHouse;
  };

  window.data = {
    getArrayHouse: getArrayHouse
  };
})();
