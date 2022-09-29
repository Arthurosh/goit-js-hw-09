import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  daysTimer: document.querySelector('[data-days]'),
  hoursTimer: document.querySelector('[data-hours]'),
  minutesTimer: document.querySelector('[data-minutes]'),
  secondsTimer: document.querySelector('[data-seconds]'),
};

refs.btnStart.addEventListener('click', onBtnStart);
refs.btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] >= Date.now()) {
      refs.btnStart.removeAttribute('disabled');
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(refs.input, options);

function onBtnStart() {
  refs.btnStart.disabled = true;
  const timer = setInterval(() => {
    updateClock(convertMs(Date.parse(refs.input.value) - Date.now()));
    if (Date.parse(refs.input.value) - Date.now() < 1000) {
      clearInterval(timer);
    }
  }, 1000);
}

function updateClock({ days, hours, minutes, seconds }) {
  refs.daysTimer.textContent = addLeadingZero(days);
  refs.hoursTimer.textContent = addLeadingZero(hours);
  refs.minutesTimer.textContent = addLeadingZero(minutes);
  refs.secondsTimer.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
