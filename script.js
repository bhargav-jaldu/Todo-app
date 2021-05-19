const formEl = document.getElementById('form');
const todosUL = document.querySelector('#todosul');
const inputEl = document.getElementById('input');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach((todo) => {
    createTodos(todo);
  });
}
formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  createTodos();
});

function createTodos(todo) {
  let inputValue = inputEl.value;

  if (todo) {
    inputValue = todo.text;
  }

  if (inputValue) {
    let todos = document.createElement('li');

    if (todo && todo.completed) {
      todos.classList.add('completed');
    }

    todos.classList.add('todos');
    todos.innerHTML = inputValue;

    todos.addEventListener('click', () => {
      todos.classList.toggle('completed');

      updateLS();
    });

    todos.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todos.remove();

      updateLS();
    });

    todosUL.appendChild(todos);
    inputEl.value = '';

    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll('li');

  let todos = [];
  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}
