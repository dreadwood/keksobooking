'use strict';

(function () {
  var formAd = document.querySelector('.ad-form');
  var titleFormAd = formAd.querySelector('#title');
  var addressFormAd = formAd.querySelector('#address');
  var numberOfRoomsFormAd = formAd.querySelector('#room_number');
  var capacityRoomFormAd = formAd.querySelector('#capacity');
  var housingTypeFormAd = formAd.querySelector('#type');
  var priceFormAd = formAd.querySelector('#price');
  var timeinFormAd = formAd.querySelector('#timein');
  var timeoutFormAd = formAd.querySelector('#timeout');
  var resetButtonFormAd = formAd.querySelector('.ad-form__reset');
  var minPriceHousingType = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  // Получить кординаты pin--main и вставить в поле адреса
  var getAddress = function (center) {
    addressFormAd.defaultValue = center ? window.pin.coordsOfCenterMain() : window.pin.coordsOfPointerMain();
  };

  // Заблокировать поля формы
  var changeDisabledForm = function (form, block) {
    var fieldsetOfForm = form.querySelectorAll('fieldset, select');
    if (block) {
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

  // Вся валидация форм
  var validationFormAdHandler = function (evt) {
    validateRoomsAdnCapacity();
    validatePriceRoom();
    validateTime(evt);
  };

  // Обработчик отправки формы
  formAd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(formAd), window.map.createSuccess, window.map.createError);
  });

  // Активация формы
  var activateFormAd = function () {
    formAd.classList.remove('ad-form--disabled'); // удал стиль блокир
    changeDisabledForm(formAd, false); // разблок поля форм
    getAddress(); // заполн адрес pin--main
    titleFormAd.setAttribute('required', ''); // устан обязат атриб полю title
    formAd.addEventListener('change', validationFormAdHandler); // доб валидац

    resetButtonFormAd.addEventListener('click', window.change.resetHandler); // сброс форм
  };

  // Сброс формы
  var resetFormAd = function () {
    formAd.reset(); // сброс знач форм
    formAd.classList.add('ad-form--disabled'); // доб стиль блокир
    window.form.changeDisabled(formAd, true); // заблок поля форм
    getAddress(true); // заполн адрес pin--main
  };

  window.form = {
    changeDisabled: changeDisabledForm,
    activate: activateFormAd,
    reset: resetFormAd
  };
})();
