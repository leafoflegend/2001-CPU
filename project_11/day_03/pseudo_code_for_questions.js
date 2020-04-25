// FYI This code wont work. Its pseudo code.

// - how to store the token and username in state? ✅
//   - We get the token by using our username, so the username has to be made available first.
// - Once we have that, we probably do a ternary in terms of "how" to get the token.
// - Check localstorage, if its there, attempt to use that.
// - If its not there, go fetch a new one, and attempt to use that.
// - If the token you attempted to use works, store it in state (and localStorage if its new).
// - If it didn't work, its likely expired, so you'll have to re-login to get the token, then store in state/localStorage.

// Eventually username would never be hardcoded, even if this is what we wanted - by that i mean we the developer are using our email - we would actually pass it in as whats called an ENV variable, or as a cli argument. The reason for this is to omit it from github, or people reading our source code.
const USERNAME = 'eliot@eliot.com';

const state = {
  token: null,
};

const signup = () => {};
const login = () => {};
const testToken = () => {};
const getFromLS = () => {};
const setIntoLS = () => {};
const checkErrorCode = () => {};
const updateState = () => {};

const bootstrap = async () => {
  const token = getFromLS();

  if (!token) {
    try {
      const signupToken = await signup();

      setIntoLS(signupToken);
      updateState(signupToken);
    } catch (e) {
      if (checkErrorCode(e) === 'email_already_taken') {
        const loginToken = await login();

        setIntoLS(loginToken);
        updateState(loginToken);
      } else {
        throw new Error('Network down.');
      }
    }
  } else {
    try {
      await testToken(token);

      updateState(token);
    } catch (e) {
      if (checkErrorCode(e) === 'token_expired') {
        const loginToken = await login();

        setIntoLS(loginToken);
        updateState(loginToken);
      } else {
        throw new Error('Network down.');
      }
    }
  }
}

// Applications and Render Flow

// Applications are just representations of state.
// Apps have an initial state, that is rendered, (sometimes servers can perform actions as well) users perform an action that changes state, app is then re-rendered.

const initialState = {
  todos: [],
};

const state = initialState;

// Behavioral Functions we define

const addTodo = () => {};
const completeTodo = () => {};
const removeTodo = () => {};

const createInitialScreen = (state) => {
  if (state.token) {
    return strangerThings();
  } else {
    return loginScreen();
  }
}

const createHeader = (todos) => {
  if (!todos.length) {
    return $(`<h1> You have no todos! </h1>`);
  } else {
    return $(`<h1> You have ${todos.length} tasks left! </h1>`);
  }
}

const createTodoCards = () => {};

const render = () => {
  // Clear last render!
  app.clear();
  const container = $('<div>');
  container.addClass('todo_container');

  // We recreate the components of the next render using state.
  const header = createHeader(state.todos);
  const todoCards = createTodoCards(state.todos);

  // We assemble them together.
  container.append(header, todoCards);

  // We finally publish the image we've assembled.
  $(document).ready(() => {
    app.append(container);
  });
}
