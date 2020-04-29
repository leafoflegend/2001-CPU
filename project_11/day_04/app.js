const app = $('#app');

const state = {
  todos: [],
};

// Proxy Object
// setter

// Non-Sequitar (not from core lecture)
const objOne = {
  __dog: null,
  set dog(val) {
    objOne.__dog = val;

    render();
  },
  get dog() {
    return objOne.__dog;
  }
}

const setState = (todos) => {
  state.todos = todos;

  render();
}

const createToDoContainer = () => {
  const toDoContainer = $('<div>');
  toDoContainer.css({
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    width: '100vw',
    height: '100vh',
    'overflow-x': 'hidden',
    'overflow-y': 'scroll',
  })

  return toDoContainer;
}

const container = createToDoContainer();

app.append(container);

const createTodos = (todos) => {
  if (!todos.length) {
    return $('<h1> You have no tasks at this time! </h1>');
  }

  return todos.map(todo => createToDo(todo));
}

const createToDo = (todo) => {
  const { title, complete } = todo;

  const toDoCard = $('<div>');
  toDoCard.css({
    border: 'solid 3px hotpink',
    'border-radius': '15px',
    width: '95%',
    height: '150px',
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-evenly',
    'align-items': 'center',
    margin: '10px 0px',
  });

  const toDoText = $(`<h3> ${title} </h3>`);

  const button = $(`<button> ${
    complete 
      ? 'Undo' 
      : 'Complete'
  } </button>`);
  button.click(() => {
    todo.complete = !todo.complete;
    render();
  });

  toDoCard.append(toDoText, button);

  return toDoCard;
};

const render = () => {
  container.empty();

  const todos = createTodos(state.todos);

  container.append(todos);
};

render();

fetch('http://strangers-things.herokuapp.com/api/posts')
  .then(res => res.json())
  .then(response => {
    setState(response.data.posts.map(post => {
      return {
        title: post.title,
        complete: false,
      };
    }));
  })
  .catch(e => {
    console.error(e);
  });

objOne.dog = 'Winston';
console.log(objOne.dog);
