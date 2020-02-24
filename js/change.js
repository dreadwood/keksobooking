'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_BUTTON = 0;

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapFilters = map.querySelector('.map__filters');
  var mapPinMain = map.querySelector('.map__pin--main');
  var formAd = document.querySelector('.ad-form');
  var addressFormAd = formAd.querySelector('#address');
  var titleFormAd = formAd.querySelector('#title');
  // var submitButtonFormAd = formAd.querySelector('.ad-form__submit');

  // Активация страницы
  var activatePage = function (evtActivate) {
    map.classList.remove('map--faded');

    formAd.classList.remove('ad-form--disabled');
    window.form.changeDisabledForm(formAd, false);

    window.form.changeDisabledForm(mapFilters, false);
    mapPins.appendChild(window.map.fragmentPin);

    addressFormAd.defaultValue = window.pin.getPinCoordsPointer(mapPinMain);
    titleFormAd.setAttribute('required', '');
    formAd.addEventListener('change', window.form.validateRoomsAdnCapacity);

    evtActivate.preventDefault();
  };

  // Включние неактивного состояния
  window.form.changeDisabledForm(formAd, true);
  window.form.changeDisabledForm(mapFilters, true);
  addressFormAd.defaultValue = window.pin.getPinCoordsCenter(mapPinMain);

  // Включние активного состояния
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      activatePage(evt);
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      activatePage(evt);
    }
  });
})();
