const TODOS_URL = `https://jsonplace-univclone.herokuapp.com/todos`;

function fetchTodos() {
  return fetch(TODOS_URL)
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.error(`Error fetching data from ${TODOS_URL}. Error: ${err.message}`);

      return [];
    });
}

function createAllTodos(todos) {
  return todos.reduce((accum, todo) => {
    const { completed } = todo;
    const { incomplete, complete } = accum;

    return {
      incomplete: completed
        ? incomplete
        : [...incomplete, createTodo(todo)],
      complete: completed
        ? [...complete, createTodo(todo)]
        : complete,
    };
  }, {
    incomplete: [],
    complete: [],
  });
}

function createTodo({ title, completed }) {
  return $(`
<div class="todo">
  <h3>${title}</h3>
  <footer>
    <button>${completed ? 'UNDO' : 'COMPLETE'}</button>
  </footer>
</div>
  `);
}

const INCOMPLETE_CONTAINER = $($('.todo-list.incomplete')[0]);
const COMPLETE_CONTAINER = $($('.todo-list.complete')[0]);

function bootstrap() {
  fetchTodos()
    .then((todos) => {
      const { complete, incomplete } = createAllTodos(todos);

      INCOMPLETE_CONTAINER.append(incomplete);
      COMPLETE_CONTAINER.append(complete);
    });
}

bootstrap();
