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
  console.log(user);
  if (user.phone.length !== 13) {
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
    .post(
      'https://664cf736ede9a2b556523d2a.mockapi.io/barber-shope-clients',
      options
    )
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
