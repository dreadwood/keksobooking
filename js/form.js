'use strict';

(function () {
  var formAd = document.querySelector('.ad-form');
  var addressFormAd = formAd.querySelector('#address');
  var numberOfRoomsFormAd = formAd.querySelector('#room_number');
  var capacityRoomFormAd = formAd.querySelector('#capacity');
  var housingTypeFormAd = formAd.querySelector('#type');
  var priceFormAd = formAd.querySelector('#price');
  var timeinFormAd = formAd.querySelector('#timein');
  var timeoutFormAd = formAd.querySelector('#timeout');
  var minPriceHousingType = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  // Получить кординаты pin--main и вставить в поле адреса
  var getAddress = function (boolean) {
    if (boolean) {
      addressFormAd.defaultValue = window.pin.coordsOfCenterMain();
    } else {
      addressFormAd.defaultValue = window.pin.coordsOfPointerMain();
    }
  };

  // Заблокировать поля формы
  var changeDisabledForm = function (form, boolean) {
    var fieldsetOfForm = form.querySelectorAll('fieldset, select');
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

  // Валидация комнат и гостей
  var validateRoomsAdnCapacity = function () {
    if (Number(numberOfRoomsFormAd.value) < Number(capacityRoomFormAd.value)) {
      numberOfRoomsFormAd.setCustomValidity('Колличество комнат должно быть больше или равно колличеству гостей');
    } else {
      numberOfRoomsFormAd.setCustomValidity('');
    }
  };

  // Валидация типа жилья и цены
  var validatePriceRoom = function () {
    var minPrice = minPriceHousingType[housingTypeFormAd.value];
    priceFormAd.placeholder = minPrice;
    if (priceFormAd.value < minPrice) {
      priceFormAd.setCustomValidity('Минимальная цена данного типа жилья ' + minPrice + ' рублей');
    } else {
      priceFormAd.setCustomValidity('');
    }
  };

  // Валидация времени заезда и выезда
  var validateTime = function (evt) {
    if (evt.target.name === 'timeout' || evt.target.name === 'timein') {
      timeinFormAd.value = evt.target.value;
      timeoutFormAd.value = evt.target.value;
    }
  };

  var addValidationFormAd = function (evt) {
    validateRoomsAdnCapacity();
    validatePriceRoom();
    validateTime(evt);
  };

  window.form = {
    changeDisabled: changeDisabledForm,
    validation: addValidationFormAd,
    address: getAddress
  };
})();
