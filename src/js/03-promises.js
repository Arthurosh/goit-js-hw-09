import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form, addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitForm(e) {
  e.preventDefault();

  let delay = Number(e.target.elements.delay.value);
  let step = Number(e.target.elements.step.value);
  let amount = Number(e.target.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
