(() => {
  const ESC_KEY = 'Escape';
  const ENTER_KEY = 'Enter';
  const LEFT_MOUSE_BUTTON = 0;
  const DEBOUNCE_INTERVAL = 500;
  let lastTimeout;

  // удаляет все дочерные элементы с определенным классом
  const deleteElements = (node, className) => {
    const elementsArrayForRemove = node.querySelectorAll('.' + className);
    elementsArrayForRemove.forEach((element) => {
      element.remove();
    });
  };

  // функции проверки нажатия ESC
  const isEscEvent = (evt, cb) => {
    if (evt.key === ESC_KEY) {
      cb();
    }
  };

  // функции проверки нажатия Enter
  const isEnterEvent = (evt, cb) => {
    if (evt.key === ENTER_KEY) {
      cb();
    }
  };

  // функции проверки нажатия левой клавиши мыши
  const isLeftButtonEvent = (evt, cb) => {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      cb();
    }
  };

  // устранение дребезга
  const debounce = (cb) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isLeftButtonEvent: isLeftButtonEvent,
    deleteElements: deleteElements,
    debounce: debounce,
  };
})();
