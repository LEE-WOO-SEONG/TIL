// State
let todos = [];
const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $completedAll = document.getElementById('ck-complete-all')
const $completedTodosCount = document.querySelector('.completed-todos');
const $leftTodosCount = document.querySelector('.active-todos');
const $clearCompleted = document.querySelector('.btn');
const $nav = document.querySelector('.nav');


// function

// 서버에 요청한 data를 가져오는 함수
const getTodo = () => {
  todos = [];

  todos = todos.sort((todo1, todo2) => todo2.id - todo1.id);
  // console.log(document.querySelector('.remove-todo'));

  render()
  // console.log(document.querySelector('.remove-todo'));
};

// 렌더링
const render = () => {

  let copyTodos = [...todos];
  const $activeId = document.querySelector('.active').id

  if ($activeId === 'active') {
    copyTodos = copyTodos.filter(todo => !todo.completed);
  } else if ($activeId === 'completed') {
    copyTodos = copyTodos.filter(todo => todo.completed);
  }
  
  let html = '';

  copyTodos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
        <input id="ck-my${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
        <label for="ck-my${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>`
  });

  $todos.innerHTML = html;
  $completedTodosCount.textContent = todos.filter(todo => todo.completed).length;
  $leftTodosCount.textContent = todos.filter(todo => !todo.completed).length;
};

addTodo = content => {
  const getId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;

  todos = [{ id: getId(), content, completed: false }, ...todos];
  // localStorage.setItem('todos', JSON.stringify(todos));
};

removeTodo = id => {
  todos = todos.filter(todo => todo.id !== +id);
  // localStorage.setItem('todos', JSON.stringify(todos));
};

completeAll = completed => {
  todos = todos.map(todo => completed ? {...todo, completed: true} : {...todo, completed: false});
  // localStorage.setItem('todos', JSON.stringify(todos));
}

validateAllcompleted = () => {
  todos.every(todo => todo.completed);
  // localStorage.setItem('todos', JSON.stringify(todos));
};

todoSelect = id => {
  todos = todos.map(todo => todo.id === +id ? {...todo, completed:!todo.completed} : todo);
  // localStorage.setItem('todos', JSON.stringify(todos));
};

clearCompleted = () => {
  todos = todos.filter(todo => !todo.completed);
  // localStorage.setItem('todos', JSON.stringify(todos));
};

// viewLeftTodo = () => {
//   const todolist = JSON.parse(localStorage.getItem('todos'));
//   todos = todolist.filter(todo => !todo.completed);
// }

// viewCompltedTodo = () => {
//   const todolist = JSON.parse(localStorage.getItem('todos'));
//   todos = todolist.filter(todo => todo.completed);
// };

// viewAll = () => {
//   todos = JSON.parse(localStorage.getItem('todos'));
// }


// event binding

// 서버에 data를 요청
window.onload = () => {
  getTodo();
}

// todo 추가
$inputTodo.onkeyup = e => {
  if (e.keyCode !== 13 || !$inputTodo.value.trim()) return;

  $inputTodo.value = $inputTodo.value.trim();
  addTodo($inputTodo.value);
  $inputTodo.value = '';

  render()
};

// todo 제거
$todos.onclick = ({ target }) => {
  if (!target.matches('.todo-item > i')) return;

  removeTodo(target.parentNode.id);
  render();
};

// all todo 선택 or 선택풀기
$completedAll.onchange = () => {

  completeAll($completedAll.checked);
  render();
};

// 특정 todo 선택
$todos.onchange = e => {
  
  todoSelect(e.target.parentNode.id);
  $completedAll.checked = validateAllcompleted() ? true : false;

  render();
};

// 완료된 todo 삭제
$clearCompleted.onclick = e => {

  clearCompleted();
  render();
};

// navitem 클릭시 display
$nav.onclick = ({ target }) => {
  if (!target.matches('.nav > li')) return;

  [...$nav.children].forEach($navitem => $navitem.classList.toggle('active', $navitem === target));

  // target.id === 'active' ? viewLeftTodo() : target.id === 'completed' ? viewCompltedTodo() : viewAll();

  render();
};