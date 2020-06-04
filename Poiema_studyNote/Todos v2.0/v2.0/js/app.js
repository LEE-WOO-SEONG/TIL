// State
let todos = [];
const $input = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');
const $todo = document.querySelector('.todo-item');
const $completeAll = document.querySelector('.complete-all > input');
const $clearCompleted = document.querySelector('.clear-completed > button');
const $leaveTodo = document.querySelector('.active-todos');
const $completeTodo = document.querySelector('.completed-todos');

// function
const render = () => {
  let html = '';

  todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
    <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
   <label for="ck-${id}">${content}</label>
   <i class="remove-todo far fa-times-corcle">X</i>
   </li>`
  })

  $todos.innerHTML = html;
  $leaveTodo.textContent = todos.filter(todo => !todo.completed).length;
  $completeTodo.textContent = todos.filter(todo => todo.completed).length;
}

const generateId = () => {
  return Math.max(...todos.map(todo => +todo.id), 0) + 1;
};


const addTodo = (content) => {
  todos = [{ id: generateId(), content: content, completed: false }, ...todos];

  render();
};

const removeTodoAll = () => {
  todos = todos.filter(todo => !todo.completed);

  render();
};

const removeSelect = id => {
  todos = todos.filter(todo => todo.id !== +id);

  render();
};

const toggleTodo = id => {
  todos = todos.map(todo => todo.id === +id ? {...todo, completed: !todo.completed} : todo);
  
  render();
};

const checkAll = () => {
  todos = todos.map(todo => ({...todo, completed: true}));

  render();
};

const clearAll = () => {
  todos = todos.map(todo => ({...todo, completed: false}));

  render();
};

// event

// window 로딩 시 변수 재 할당
window.addEventListener('load', () => {
  todos = [{
      id: 1,
      content: 'html',
      completed: false
    },
    {
      id: 3,
      content: 'css',
      completed: false
    },
    {
      id: 2,
      content: 'javascript',
      completed: true
    }
  ];
  todos = todos.sort((a, b) => b.id - a.id);

  render();
})

// todo 추가
$input.onkeyup = e => {
  if (e.keyCode !== 13 || !$input.value.trim()) return;

  $input.value.trim();
  addTodo($input.value);
  $input.value = '';
}

// todo 선택
$todos.onchange = e => {
  toggleTodo(e.target.parentNode.id);
}

// todo 선택삭제
$todos.onclick = e => {
  if(!e.target.matches('.todo-item > i')) return;
  removeSelect(e.target.parentNode.id);
};

// 모든 todo check or clear
$completeAll.onchange = () => {
  if (!$completeAll.checked) return clearAll(); 
  checkAll();
};

// 완료된 todo 모두 삭제
$clearCompleted.onclick = () => {
  removeTodoAll();
};
