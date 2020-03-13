'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  // Активация страницы
  var activatePage = function () {
    window.backend.load(window.map.activateMap, window.map.createError); // загр данных + актив карты

    window.form.activate(); // актив формы

    pinMain.removeEventListener('click', activateHandler); // удал событ актив pin--main
    pinMain.removeEventListener('keydown', activateHandler);
  };

  // Сброс страницы в неактивное состояние
  var resetPage = function () {
    window.map.resetMap(); // сброс карты

    window.form.reset(); // сброс формы

    window.map.deleteNotification(); // удал увед отправ/ошибки

    pinMain.addEventListener('click', activateHandler); // доб событ актив pin--main
    pinMain.addEventListener('keydown', activateHandler);

    document.removeEventListener('click', resetHandler); // удал событ сброс
    document.removeEventListener('keydown', resetHandler);
  };

  var activateHandler = function (evt) {
    window.data.isLeftButtonEvent(evt, activatePage);
    window.data.isEnterEvent(evt, activatePage);
  };

  var resetHandler = function (evt) {
    window.data.isLeftButtonEvent(evt, resetPage);
    window.data.isEscEvent(evt, resetPage);
  };

  // Включние неактивного состояния
  resetPage();

  // Обработчик для активного состояния
  pinMain.addEventListener('click', activateHandler);
  pinMain.addEventListener('keydown', activateHandler);

  window.change = {
    resetHandler: resetHandler
  };
})();
