// let todos = [];
let filterValue = "all";

//select items:
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todolist");
const todoFilter = document.querySelector(".filter-todos");

//events:
document.addEventListener("DOMContentLoaded", (e) => {
  let todos = getAllTodos();
  createTodoList(todos);
});
todoForm.addEventListener("submit", createTodo);
todoFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodo();
});

//functions:
function createTodo(e) {
  e.preventDefault();
  let todo = {
    title: todoInput.value,
    id: new Date().getTime(),
    createdAt: new Date(new Date().toISOString()).toLocaleDateString("fa-IR"),
    isCompleted: false,
  };
  pushNewTodo(todo);
  filterTodo(e);
  //create todo in dom
}

function createTodoList(todos) {
  // let todos = [];
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
      <p class="todo__title ${todo.isCompleted && "completed"}">${
      todo.title
    }</p>
      <span class="todo__createdAt">${todo.createdAt}</span>
      <button data-todo-id=${
        todo.id
      } class="todo__check"><i class="far fa-check-square"></i></button>
      <button data-todo-id=${
        todo.id
      } class="todo__remove"><i class="far fa-trash-alt"></i></button>
    </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";

  const todoRemoveBtns = [...document.querySelectorAll(".todo__remove")];
  todoRemoveBtns.forEach((btn) => {
    btn.addEventListener("click", removeTodo);
  });

  const todoCheckBtns = [...document.querySelectorAll(".todo__check")];
  todoCheckBtns.forEach((btn) => {
    btn.addEventListener("click", checkTodo);
  });
}

function filterTodo() {
  let todos = getAllTodos();
  switch (filterValue) {
    case "all":
      createTodoList(todos);
      break;
    case "completed":
      const completedTodos = todos.filter((t) => t.isCompleted);
      createTodoList(completedTodos);
      break;
    case "uncompleted":
      const unCompletedTodos = todos.filter((t) => !t.isCompleted);
      createTodoList(unCompletedTodos);
      break;

    default:
      createTodoList(todos);
      break;
  }
}

function removeTodo(e) {
  let todos = getAllTodos();
  const todoID = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => {
    return t.id !== todoID;
  });
  saveTodos(todos);
  filterTodo(e);
}

function checkTodo(e) {
  let todos = getAllTodos();
  const todoID = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoID);
  console.log(todo);
  todo.isCompleted = !todo.isCompleted;
  saveTodos(todos);
  filterTodo(e);
}
// console.log(todos);

//LocalStorage functions:
function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function pushNewTodo(newTodo) {
  let savedTodos = getAllTodos();
  savedTodos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos; 
}

function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos") || []);
  return savedTodos;
}
