const bgColor = function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;

refs.btnStart.addEventListener('click', onStart);
refs.btnStop.addEventListener('click', onStop);

function onStart() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = bgColor();
  }, 1000);
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
}
function onStop() {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearInterval(timerId);
}
