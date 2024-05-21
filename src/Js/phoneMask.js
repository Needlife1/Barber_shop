import { Notify } from 'notiflix/build/notiflix-notify-aio';
import _ from 'lodash';

export const phoneMask = document.addEventListener('DOMContentLoaded', () => {
  const telInput = document.querySelector('[data-tel-input]');
  if (!telInput) return;

  telInput.addEventListener('input', onTelInput);

  const handleInvalidInput = _.throttle(function handleInvalidInputThrottled() {
    Notify.failure('Please enter valid input.');
  }, 1500);

  function onTelInput(e) {
    const input = e.target;
    const inputNumbersValue = getInputNumbersValue(input);

    if (!inputNumbersValue) {
      handleInvalidInput();
      return (input.value = '');
    }

    if (inputNumbersValue[0] === '0') {
      input.value = '+38' + inputNumbersValue;
    } else {
      input.value = '+' + inputNumbersValue.substring(0, 16);
    }
  }

  function getInputNumbersValue(input) {
    return input.value.replace(/\D/g, '');
  }
});
