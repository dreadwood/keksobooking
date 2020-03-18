'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_BUTTON = 0;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  // Удаляет все дочерные элементы с определенным классом
  var deleteElements = function (node, className) {
    var elementsArrayForRemove = node.querySelectorAll('.' + className);
    elementsArrayForRemove.forEach(function (element) {
      element.remove();
    });
  };

  // Функции для обработчика нажатия клавиш
  var isEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var isLeftButtonEvent = function (evt, action) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      action();
    }
  };

  // Устранение дребезга
  var debounce = function (cb) {
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
    debounce: debounce
  };
})();
