console.log('js is running!');

const register = () => {
  return fetch('/api/users/register', {
    method: 'POST',
    headers: {
      ['Content-Type']: 'application/json',
    },
    body: JSON.stringify({
      username: 'test',
      password: '12345',
    }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        console.log(data.token);

        localStorage.setItem('token', data.token);
      } else {
        throw new Error('No token returned from server.');
      }
    })
    .catch(e => {
      console.log('Error during registration.');
      throw e;
    });
}

const getPassword = () => {
  return fetch('/api/users/my_password', {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      const app = document.querySelector('#app');

      app.innerText = data.password;
    })
    .catch(e => {
      console.log('Failure to fetch password');

      throw e;
    });
}

const startApp = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    console.log('I am already authenticated.', token);
    await getPassword();
  } else {
    await register();
  }
}

startApp();
