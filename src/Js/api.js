import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const onlineForm = document.querySelector('.online-form');

onlineForm.addEventListener('submit', createUser);

function createUser(e) {
  e.preventDefault();

  let user = {
    name: e.target.elements.name.value,
    phone: e.target.elements.phone.value,
    message: e.target.elements.message.value,
  };

  if (user.phone.length < 13) {
    Notify.failure('There are not enough numbers in the phone!');
    return;
  }
  toAddUser({ name, phone, message: 'Сall me' });

  onlineForm.reset();
}

function toAddUser(user) {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post('https://64f0b29f8a8b66ecf77a068e.mockapi.io/api/barbershop', options)
    .then(user => {
      console.log(user);
      Notify.success('Thank you, we will contact you shortly!');
    })
    .catch(error => {
      Notify.failure('Something went wrong =(). Try later!');
      console.log(error);
    });
}

export { createUser, toAddUser };
