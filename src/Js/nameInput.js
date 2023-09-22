import { Notify } from 'notiflix/build/notiflix-notify-aio';
var _ = require('lodash');
import { throttle } from 'lodash';
export const nameInput = document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.querySelector('[data-name-input]');

  nameInput.addEventListener('input', onNameinput);

  function onNameinput(e) {
    const input = e.target;
    const inputNameValue = getInputNameValue(input);

    if (!inputNameValue) {
      input.value = '';
    }
  }

  function getInputNameValue(input) {
    const sanitizedValue = input.value.replace(/[^a-zA-Zа-яА-ЯїєіґҐёЁ']/g, '');
    if (input.value !== sanitizedValue) {
      input.value = sanitizedValue;
    }
    return sanitizedValue;
  }

  nameInput.addEventListener(
    'keydown',
    _.throttle(e => {
      if (e.key >= '0' && e.key <= '9') {
        Notify.failure('You need to enter letters!!!');
        e.preventDefault();
      }
    }, 1500)
  );
});
