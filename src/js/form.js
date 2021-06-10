(() => {
  const PRICE_DEFAULT = 1000;
  const minHousingPriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };
  let tooglePreview = true; // для фотографий жилья

  const formAd = document.querySelector('.ad-form');
  const inputAvatar = formAd.querySelector('#avatar');
  const titleFormAd = formAd.querySelector('#title');
  const addressFormAd = formAd.querySelector('#address');
  const numberOfRoomsFormAd = formAd.querySelector('#room_number');
  const capacityRoomFormAd = formAd.querySelector('#capacity');
  const housingTypeFormAd = formAd.querySelector('#type');
  const priceFormAd = formAd.querySelector('#price');
  const timeinFormAd = formAd.querySelector('#timein');
  const timeoutFormAd = formAd.querySelector('#timeout');
  const inputImages = formAd.querySelector('#images');
  const previewAvatar = formAd.querySelector('.ad-form-header__preview-img');
  const photoContainer = formAd.querySelector('.ad-form__photo-container');
  const previewPhoto = formAd.querySelectorAll('.ad-form__photo');
  const resetButtonFormAd = formAd.querySelector('.ad-form__reset');

  // получить кординаты pin--main и вставить в поле адреса
  const getAddress = (center) => {
    addressFormAd.defaultValue = center ? window.pin.getCoordsOfCenterMain() : window.pin.getCoordsOfPointerMain();
  };

  // заблокировать поля формы
  const changeDisabledForm = (form, block) => {
    const fieldsetsOfForm = form.querySelectorAll('fieldset, select');
    if (block) {
      fieldsetsOfForm.forEach((fieldset) => {
        fieldset.setAttribute('disabled', '');
      });
    } else {
      fieldsetsOfForm.forEach((fieldset) => {
        fieldset.removeAttribute('disabled');
      });
    }
  };

  // валидация комнат и гостей
  const validateRoomsAdnCapacity = () => {
    const rooms = Number(numberOfRoomsFormAd.value);
    const guests = Number(capacityRoomFormAd.value);
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

  // валидация типа жилья и цены
  const validatePriceRoom = () => {
    const minPrice = minHousingPriceMap[housingTypeFormAd.value];
    priceFormAd.placeholder = minPrice;
    if (priceFormAd.value < minPrice) {
      priceFormAd.setCustomValidity('Минимальная цена данного типа жилья ' + minPrice + ' рублей');
    } else {
      priceFormAd.setCustomValidity('');
    }
  };

  // валидация времени заезда и выезда
  const validateTime = (evt) => {
    if (evt.target.name === 'timeout' || evt.target.name === 'timein') {
      timeinFormAd.value = evt.target.value;
      timeoutFormAd.value = evt.target.value;
    }
  };

  // вся валидация форм
  const formChangeHandler = (evt) => {
    validateRoomsAdnCapacity();
    validatePriceRoom();
    validateTime(evt);
  };

  // обработчик отправки формы
  formAd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    window.backend.upload(new FormData(formAd), window.map.createSuccess, window.map.createError);
  });

  // сброс страницы
  const formResetHandler = (evt) => {
    window.util.isLeftButtonEvent(evt, window.change.resetPage);
  };

  // активация формы
  const activateFormAd = () => {
    formAd.classList.remove('ad-form--disabled'); // удал стиль блокир
    changeDisabledForm(formAd, false); // разблок поля форм
    getAddress(); // заполн адрес pin--main
    titleFormAd.setAttribute('required', ''); // устан обязат атриб полю title
    formAd.addEventListener('change', formChangeHandler); // доб валидац

    resetButtonFormAd.addEventListener('click', formResetHandler); // сброс страниц
  };

  // загрузка аватара
  inputAvatar.addEventListener('change', () => {
    const file = inputAvatar.files[0];

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
      previewAvatar.style = 'width: 100%; height: 100%';
    });

    reader.readAsDataURL(file);
  });

  // загрузка фотографий
  inputImages.addEventListener('change', () => {
    const files = Array.from(inputImages.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const previewPhoto = formAd.querySelectorAll('.ad-form__photo');
        const stylePreview = 'background-color: #e4e4de; background-image: url("' + reader.result + '"); background-size: cover;';
        if (tooglePreview) {
          previewPhoto[0].style = stylePreview;
          tooglePreview = false;
        } else {
          const previewPhotoElement = previewPhoto[0].cloneNode();
          previewPhotoElement.classList.add('ad-form__photo--extra');
          previewPhotoElement.style = stylePreview;
          photoContainer.appendChild(previewPhotoElement);
        }
      });

      reader.readAsDataURL(file);
    });
  });

  // сброс фото аватара и фотографий жилья
  const resetPhotoFormAd = () => {
    previewAvatar.src = 'img/muffin-grey.svg';
    previewAvatar.style = '';
    window.util.deleteElements(photoContainer, 'ad-form__photo--extra');
    previewPhoto[0].style = '';
    tooglePreview = true;
  };

  // сброс формы
  const resetFormAd = () => {
    formAd.reset(); // сброс знач форм
    priceFormAd.placeholder = PRICE_DEFAULT; // устан станд цену в прайс
    formAd.classList.add('ad-form--disabled'); // доб стиль блокир
    changeDisabledForm(formAd, true); // заблок поля форм
    resetPhotoFormAd(); // удал аватар и фото
    getAddress(true); // заполн адрес pin--main
  };

  window.form = {
    changeDisabled: changeDisabledForm,
    getAddress: getAddress,
    activate: activateFormAd,
    reset: resetFormAd,
  };
})();
