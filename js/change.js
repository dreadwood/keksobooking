'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_BUTTON = 0;

  var map = document.querySelector('.map');
  var formFilters = map.querySelector('.map__filters');
  var pinMain = map.querySelector('.map__pin--main');
  var formAd = document.querySelector('.ad-form');
  var titleFormAd = formAd.querySelector('#title');

  // Активация страницы
  var activatePage = function (evtActivate) {
    evtActivate.preventDefault();

    map.classList.remove('map--faded');
    formAd.classList.remove('ad-form--disabled');
    window.form.changeDisabled(formFilters, false);
    window.map.addPinAd();

    window.form.changeDisabled(formAd, false);
    window.form.address();
    titleFormAd.setAttribute('required', '');
    formAd.addEventListener('change', window.form.validation);

    pinMain.removeEventListener('mousedown', activateHandler);
  };

  var activateHandler = function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      activatePage(evt);
    }
  };

  // Включние неактивного состояния
  window.form.changeDisabled(formAd, true);
  window.form.changeDisabled(formFilters, true);
  window.form.address(true);

  // Включние активного состояния
  pinMain.addEventListener('mousedown', activateHandler);

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      activatePage(evt);
    }
  });
})();
