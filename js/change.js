'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  // Активация страницы
  var activatePage = function () {
    window.backend.load(window.map.activate, window.map.createError); // загр данных + актив карты

    window.form.activate(); // актив формы

    pinMain.removeEventListener('click', pageActivateHandler); // удал событ актив pin--main
    pinMain.removeEventListener('keydown', pageActivateHandler);
  };

  // Сброс страницы в неактивное состояние
  var resetPage = function () {
    window.map.reset(); // сброс карты

    window.form.reset(); // сброс формы

    window.map.deleteNotification(); // удал увед отправ/ошибки

    pinMain.addEventListener('click', pageActivateHandler); // доб событ актив pin--main
    pinMain.addEventListener('keydown', pageActivateHandler);

    document.removeEventListener('click', pageResetHandler); // удал событ сброс
    document.removeEventListener('keydown', pageResetHandler);
  };

  var pageActivateHandler = function (evt) {
    window.util.isLeftButtonEvent(evt, activatePage);
    window.util.isEnterEvent(evt, activatePage);
  };

  var pageResetHandler = function (evt) {
    window.util.isLeftButtonEvent(evt, resetPage);
    window.util.isEscEvent(evt, resetPage);
  };

  // Включние неактивного состояния
  resetPage();

  // Обработчик для активного состояния
  pinMain.addEventListener('click', pageActivateHandler);
  pinMain.addEventListener('keydown', pageActivateHandler);

  window.change = {
    pageResetHandler: pageResetHandler
  };
})();
