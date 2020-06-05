const app = $('#app');

const state = {
  username: '',
  password: '',
};

const onInput = (e) => {
  const { target: { name, value } } = e;

  state[name] = value;

  console.log(state);
}

const createForm = () => {
  const form = $('<form>');

  const usernameInput = $(`
    <label>
        Username
        <input name='username' />
    </label>
  `);
  const passwordInput = $(`
    <label>
        Password
        <input name='password' type='password' />
    </label>
  `);

  usernameInput.on('input', onInput);
  passwordInput.on('input', onInput);

  const submitButton = $('<button> Login </button>');

  form.on('submit', (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        const result = $(`
            <h3>${data.user ? `You are logged in as user with id ${data.user.id}` : 'Failed to login.'}</h3>
        `);

        app.append(result);
      });
  })

  form.append(usernameInput, passwordInput, submitButton);

  return form;
}

$(document).ready(() => {
  app.append(createForm());
});
