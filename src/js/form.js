'use strict';

(function () {
  var PRICE_DEFAULT = 1000;
  var minHousingPriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var formAd = document.querySelector('.ad-form');
  var inputAvatar = formAd.querySelector('#avatar');
  var titleFormAd = formAd.querySelector('#title');
  var addressFormAd = formAd.querySelector('#address');
  var numberOfRoomsFormAd = formAd.querySelector('#room_number');
  var capacityRoomFormAd = formAd.querySelector('#capacity');
  var housingTypeFormAd = formAd.querySelector('#type');
  var priceFormAd = formAd.querySelector('#price');
  var timeinFormAd = formAd.querySelector('#timein');
  var timeoutFormAd = formAd.querySelector('#timeout');
  var inputImages = formAd.querySelector('#images');
  var previewAvatar = formAd.querySelector('.ad-form-header__preview-img');
  var photoContainer = formAd.querySelector('.ad-form__photo-container');
  var previewPhoto = formAd.querySelectorAll('.ad-form__photo');
  var resetButtonFormAd = formAd.querySelector('.ad-form__reset');
  var tooglePreview = true; // для фотографий жилья

  // Получить кординаты pin--main и вставить в поле адреса
  var getAddress = function (center) {
    addressFormAd.defaultValue = center ? window.pin.getCoordsOfCenterMain() : window.pin.getCoordsOfPointerMain();
  };

  // Заблокировать поля формы
  var changeDisabledForm = function (form, block) {
    var fieldsetsOfForm = form.querySelectorAll('fieldset, select');
    if (block) {
      fieldsetsOfForm.forEach(function (fieldset) {
        fieldset.setAttribute('disabled', '');
      });
    } else {
      fieldsetsOfForm.forEach(function (fieldset) {
        fieldset.removeAttribute('disabled');
      });
    }
  };

  // Валидация комнат и гостей
  var validateRoomsAdnCapacity = function () {
    var rooms = Number(numberOfRoomsFormAd.value);
    var guests = Number(capacityRoomFormAd.value);
    if (rooms === 100 && guests !== 0) {
      numberOfRoomsFormAd.setCustomValidity('Такое колличество комнат не для гостей');
    } else if (rooms !== 100 && guests === 0) {
      numberOfRoomsFormAd.setCustomValidity('"Не для гостей" можно выбрать только 100 комнат');
    } else if (rooms < guests) {
      numberOfRoomsFormAd.setCustomValidity('Колличество комнат должно быть больше или равно колличеству гостей');
    } else {
      numberOfRoomsFormAd.setCustomValidity('');
    }
  };

  // Валидация типа жилья и цены
  var validatePriceRoom = function () {
    var minPrice = minHousingPriceMap[housingTypeFormAd.value];
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
  var formChangeHandler = function (evt) {
    validateRoomsAdnCapacity();
    validatePriceRoom();
    validateTime(evt);
  };

  // Обработчик отправки формы
  formAd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(formAd), window.map.createSuccess, window.map.createError);
  });

  // Сброс страницы
  var formResetHandler = function (evt) {
    window.util.isLeftButtonEvent(evt, window.change.resetPage);
  };

  // Активация формы
  var activateFormAd = function () {
    formAd.classList.remove('ad-form--disabled'); // удал стиль блокир
    changeDisabledForm(formAd, false); // разблок поля форм
    getAddress(); // заполн адрес pin--main
    titleFormAd.setAttribute('required', ''); // устан обязат атриб полю title
    formAd.addEventListener('change', formChangeHandler); // доб валидац

    resetButtonFormAd.addEventListener('click', formResetHandler); // сброс страниц
  };

  // Загрузка аватара
  inputAvatar.addEventListener('change', function () {
    var file = inputAvatar.files[0];

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      previewAvatar.src = reader.result;
      previewAvatar.style = 'width: 100%; height: 100%';
    });

    reader.readAsDataURL(file);
  });

  // Загрузка фотографий
  inputImages.addEventListener('change', function () {
    var files = Array.from(inputImages.files);

    files.forEach(function (file) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewPhoto = formAd.querySelectorAll('.ad-form__photo');
        var stylePreview = 'background-color: #e4e4de; background-image: url("' + reader.result + '"); background-size: cover;';
        if (tooglePreview) {
          previewPhoto[0].style = stylePreview;
          tooglePreview = false;
        } else {
          var previewPhotoElement = previewPhoto[0].cloneNode();
          previewPhotoElement.classList.add('ad-form__photo--extra');
          previewPhotoElement.style = stylePreview;
          photoContainer.appendChild(previewPhotoElement);
        }
      });

      reader.readAsDataURL(file);
    });
  });

  // Сброс фото аватара и фотографий жилья
  var resetPhotoFormAd = function () {
    previewAvatar.src = 'img/muffin-grey.svg';
    previewAvatar.style = '';
    window.util.deleteElements(photoContainer, 'ad-form__photo--extra');
    previewPhoto[0].style = '';
    tooglePreview = true;
  };

  // Сброс формы
  var resetFormAd = function () {
    formAd.reset(); // сброс знач форм
    priceFormAd.placeholder = PRICE_DEFAULT; // устан станд цену в прайс
    formAd.classList.add('ad-form--disabled'); // доб стиль блокир
    window.form.changeDisabled(formAd, true); // заблок поля форм
    resetPhotoFormAd(); // удал аватар и фото
    getAddress(true); // заполн адрес pin--main
  };

  window.form = {
    changeDisabled: changeDisabledForm,
    getAddress: getAddress,
    activate: activateFormAd,
    reset: resetFormAd
  };
})();
