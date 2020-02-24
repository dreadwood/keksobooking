'use strict';

(function () {
  var formAd = document.querySelector('.ad-form');
  var numberOfRoomsFormAd = formAd.querySelector('#room_number');
  var capacityRoomFormAd = formAd.querySelector('#capacity');

  // Заблокировать поля формы
  var changeDisabledForm = function (form, boolean) {
    var fieldsetOfForm = form.querySelectorAll('fieldset, select');
    if (boolean === true) {
      for (var j = 0; j < fieldsetOfForm.length; j++) {
        fieldsetOfForm[j].setAttribute('disabled', '');
      }
    } else {
      for (var k = 0; k < fieldsetOfForm.length; k++) {
        fieldsetOfForm[k].removeAttribute('disabled');
      }
    }
  };

  // Валидация комнат и гостей
  var validateRoomsAdnCapacity = function () {
    if (Number(numberOfRoomsFormAd.value) < Number(capacityRoomFormAd.value)) {
      numberOfRoomsFormAd.setCustomValidity('Колличество комнат должно быть больше или равно колличеству гостей');
    } else {
      numberOfRoomsFormAd.setCustomValidity('');
    }
  };

  // Добавление адреса для отправки формы
  formAd.setAttribute('action', 'https://js.dump.academy/keksobooking');

  window.form = {
    changeDisabledForm: changeDisabledForm,
    validateRoomsAdnCapacity: validateRoomsAdnCapacity
  };
})();
