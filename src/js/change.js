(() => {
  const map = document.querySelector('.map');
  const pinMain = map.querySelector('.map__pin--main');

  // активация страницы
  const activatePage = () => {
    window.backend.load(window.map.activate, window.map.createError); // загр данных + актив карты

    window.form.activate(); // актив формы

    pinMain.removeEventListener('mousedown', pinMainClickHandler); // удал событ актив pin--main
    pinMain.removeEventListener('keydown', pinMainPressKeyHandler);
  };

  // сброс страницы в неактивное состояние
  const resetPage = () => {
    window.map.reset(); // сброс карты

    window.form.reset(); // сброс формы

    window.map.deleteNotification(); // удал увед отправ/ошибки

    pinMain.addEventListener('mousedown', pinMainClickHandler); // доб событ актив pin--main
    pinMain.addEventListener('keydown', pinMainPressKeyHandler);

    document.removeEventListener('mousedown', pageClickHandler); // удал событ сброс
    document.removeEventListener('keydown', pageEscPressHandler);
  };

  // активация страницы
  const pinMainClickHandler = (evt) => {
    window.util.isLeftButtonEvent(evt, activatePage);
  };

  const pinMainPressKeyHandler = (evt) => {
    window.util.isEnterEvent(evt, activatePage);
  };

  const pageEscPressHandler = (evt) => {
    window.util.isEscEvent(evt, resetPage);
  };

  const pageClickHandler = (evt) => {
    window.util.isLeftButtonEvent(evt, resetPage);
  };

  // включние неактивного состояния
  resetPage();

  // обработчик для активного состояния
  pinMain.addEventListener('mousedown', pinMainClickHandler);
  pinMain.addEventListener('keydown', pinMainPressKeyHandler);

  window.change = {
    resetPage: resetPage,
    pageEscPressHandler: pageEscPressHandler,
    pageClickHandler: pageClickHandler,
  };
})();
