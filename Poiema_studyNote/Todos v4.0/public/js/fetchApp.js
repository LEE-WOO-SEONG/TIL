import { fetchReq } from './fetch.js';

// State
let todos = [];
let navState = 'all';

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
  fetchReq.get('/todos')
  .then(res => res.json())
  .then(_todos => {
    todos = _todos;

    render();
  })
  .catch(err => console.log(err));
};

// 렌더링
const render = () => {

  let html = '';
  let _todos = todos.filter(({ completed }) => navState === 'completed' ? completed : navState === 'active' ? !completed : true);

  _todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
        <input id="ck-my${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
        <label for="ck-my${id}">${content}</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>`
  });

  $todos.innerHTML = html;
  $completedTodosCount.textContent = todos.filter(todo => todo.completed).length;
  $leftTodosCount.textContent = todos.filter(todo => !todo.completed).length;
  $completedAll.checked = validateAllcompleted();
};

const addTodo = content => {
  const getId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;
  const newTodo = { id: getId(), content, completed: false };

  fetchReq.post('/todos', newTodo)
  .then(res => res.json())
  .then(_todos => {
    todos = _todos;

    render();
  })
  .catch(err => console.log(err));
};

const removeTodo = id => {

  fetchReq.delete(`/todos/${id}`)
  .then(res => res.json())
  .then(_todos => {
    todos = _todos;

    render();
  })
  .catch(err => console.log(err));
};

const completeAll = checkState => {
  const completed = checkState;

  fetchReq.patch('/todos', { completed })
  .then(res => res.json())
  .then(_todos => {
    todos = _todos;

    render();
  })
  .catch(err => console.log(err));
};

const validateAllcompleted = () => {
  if (todos.length) return todos.every(todo => todo.completed);
};

const todoSelect = id => {
  const completed = !todos.find(todo => todo.id === +id).completed;

  fetchReq.patch(`/todos/${id}`, { completed })
  .then(res => res.json())
  .then(_todos => {
    todos = _todos;

    render();
  })
  .catch(err => console.log(err));
};

const clearCompleted = () => {

  fetchReq.delete('todos/completed')
  .then(res => res.json())
  .then(_todos => {
    todos = _todos;

    render();
  })
  .catch(err => console.log(err));
};

const changeNavState = id => {
  [...$nav.children].forEach($navitem => $navitem.classList.toggle('active', $navitem.id === id));
  navState = id;
};


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
};

// todo 제거
$todos.onclick = ({ target }) => {
  if (!target.matches('.todo-item > i')) return;

  removeTodo(target.parentNode.id);
};

// all todo 선택 or 선택풀기
$completedAll.onchange = () => {

  completeAll($completedAll.checked);
  render();
};

// 특정 todo 선택
$todos.onchange = e => {

  todoSelect(e.target.parentNode.id);
};

// 완료된 todo 삭제
$clearCompleted.onclick = e => {

  clearCompleted();
  render();
};

// navitem 클릭시 display
$nav.onclick = ({
  target
}) => {
  if (!target.matches('.nav > li:not(.active)')) return;

  changeNavState(target.id);
  render();
};