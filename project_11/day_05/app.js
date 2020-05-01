const app = $('#app');

const form = document.querySelector('form');

const state = {
  firstName: '',
  lastName: '',
}

form.addEventListener('submit', (ev) => {
  // ev.preventDefault();
});

form.addEventListener('input', (ev) => {
  state[ev.target.name] = ev.target.value;

  console.log(state);
});
