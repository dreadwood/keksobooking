'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  // Активация страницы
  var activatePage = function () {
    window.backend.load(window.map.activate, window.map.createError); // загр данных + актив карты

    window.form.activate(); // актив формы

    pinMain.removeEventListener('mousedown', pinMainClickHandler); // удал событ актив pin--main
    pinMain.removeEventListener('keydown', pinMainPressKeyHandler);
  };

  // Сброс страницы в неактивное состояние
  var resetPage = function () {
    window.map.reset(); // сброс карты

    window.form.reset(); // сброс формы

    window.map.deleteNotification(); // удал увед отправ/ошибки

    pinMain.addEventListener('mousedown', pinMainClickHandler); // доб событ актив pin--main
    pinMain.addEventListener('keydown', pinMainPressKeyHandler);

    document.removeEventListener('mousedown', pageClickHandler); // удал событ сброс
    document.removeEventListener('keydown', pageEscPressHandler);
  };

  // Активация страницы
  var pinMainClickHandler = function (evt) {
    window.util.isLeftButtonEvent(evt, activatePage);
  };

  var pinMainPressKeyHandler = function (evt) {
    window.util.isEnterEvent(evt, activatePage);
  };

  var pageEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, resetPage);
  };

  var pageClickHandler = function (evt) {
    window.util.isLeftButtonEvent(evt, resetPage);
  };

  // Включние неактивного состояния
  resetPage();

  // Обработчик для активного состояния
  pinMain.addEventListener('mousedown', pinMainClickHandler);
  pinMain.addEventListener('keydown', pinMainPressKeyHandler);

  window.change = {
    resetPage: resetPage,
    pageEscPressHandler: pageEscPressHandler,
    pageClickHandler: pageClickHandler
  };
})();
