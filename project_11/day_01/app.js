// CRUD

// Create - POST
// Read - GET
// Update - PUT
// Delete - DELETE

// You can accomplish anything with data using these four operations.

// TCP

// fetch defaults to a GET request.
// fetch('https://www.google.com')

const DB = {
  superheroes: [
    {
      name: 'Superman',
      realName: 'Clark Kent',
      powers: [
        'Laser Eyes',
        'Bulletproof',
        'Blow Ice',
        'Fly',
        'Super strength',
        'Super speed',
      ],
    },
    {
      name: 'Batman',
      realName: 'Bruce Wayne',
      powers: [
        'Rich',
        'Kung Fu',
        'Smart',
      ],
    },
    {
      name: 'Iron Man',
      realName: 'Tony Stark',
      powers: [
        'Rich',
        'Super Smart',
        'Regenerative Tissue',
      ],
    },
  ],
};

// Can never access the DB directly, we must use our CRUD functions (API)

const read = (selectors) => {
  let result = DB;

  for (let i = 0; i < selectors.length; ++i) {
    result = result[selectors[i]];
  }

  return result
    ? result
    : 'Not Found!';
};

const deleteData = (selectors) => {
  let result = DB;

  for (let i = 0; i < selectors.length - 1; ++i) {
    result = result[selectors[i]];
  }

  delete result[selectors[selectors.length - 1]];
};

const update = (selectors, updatedData) => {
  let result = DB;

  for (let i = 0; i < selectors.length - 1; ++i) {
    result = result[selectors[i]];
  }

  result[selectors[selectors.length - 1]] = updatedData;

  return read(selectors);
};

const create = (selectors, dataToCreate) => {
  let lastResult = null;
  let result = DB;

  for (let i = 0; i < selectors.length; ++i) {
    if (i > 0) {
      lastResult = result;
    }
    result = result[selectors[i]];
  }

  if (Array.isArray(result)) {
    result.push(dataToCreate);
  } else {
    lastResult[selectors[selectors.length - 1]] = dataToCreate;
  }

  return read(selectors);
}

// console.log(
//   'Read: ',
//   read([
//     'superheroes',
//     1,
//   ],
// ));
//
// console.log(
//   'Delete: ',
//   deleteData([
//     'superheroes',
//     1,
//   ],
// ));
//
// console.log(
//   'Read: ',
//   read([
//     'superheroes',
//     1,
//   ],
// ));
//
// console.log(
//   'Update: ',
//   update(
//     [
//       'superheroes',
//       1,
//     ],
//     {
//       name: 'Aquaman',
//       realName: 'Arthur Curry',
//       powers: [
//         'Talk to Fish',
//         'Super strength',
//         'Super swim speed',
//       ],
//     },
//   ),
// );
//
// console.log(
//   'Create: ',
//   create(
//     ['superheroes'],
//     {
//       name: 'Captain America',
//       realName: 'Steve Rogers',
//       powers: [
//         'Super strength',
//         'Honesty',
//       ],
//     },
//   ),
// );

// We should pretend that we don't know anything about the database or how to access it.

// When we perform CRUD operations on the web, we are interacting with arbitrary data on a different machine. We can only communicate our desires to change data using CRUD operations available on that system.

const app = $('#app');

const TOKEN_KEY = 'USER_TOKEN';
const USERNAME = 'eliot_test';
const PASSWORD = 'bad_password';
let token;

app.append($('<h1> Stranger Things Test </h1>'));

const signup = async () => {
  try {
    // This is a POST request, because we are creating a user.
    const res = await fetch('http://strangers-things.herokuapp.com/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: USERNAME,
          password: PASSWORD,
        },
      }),
    });

    const json = await res.json();

    console.log('Sign up response: ', json);

    return json;
  } catch (e) {
    console.warn('Failed to sign up!');
    throw e;
  }
}

const login = async () => {
  try {
    const res = await fetch('http://strangers-things.herokuapp.com/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: USERNAME,
          password: PASSWORD,
        },
      }),
    });

    const json = await res.json();

    console.log('Login response: ', json);

    return json;
  } catch (e) {
    console.warn('Failed to Login!');
    throw e;
  }
}

const storeToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const bootstrapAPI = async () => {
  const lsToken = localStorage.getItem(TOKEN_KEY);
  if (lsToken) {
    console.log('Found previous login!', lsToken);
    token = lsToken;
  } else {
    const userRes = await signup();

    if (userRes.success) {
      const resToken = userRes.data.token;
      console.log('Successful login!', resToken);
      storeToken(token);
      token = resToken;
    } else {
      console.warn('Failed to sign up!');
      const res = await login();
      const resToken = res.data.token;
      storeToken(resToken);
      token = resToken;
    }
  }

  return token;
}

const runApp = async () => {
  const token = await bootstrapAPI();

  const res = await fetch('http://strangers-things.herokuapp.com/api/test/me', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const json = await res.json();

  console.log('App Started: ', json);
};

runApp();
