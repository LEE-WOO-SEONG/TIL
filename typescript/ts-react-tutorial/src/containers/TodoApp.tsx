import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, removeTodo, addTodo } from '../modules/todos';
import TodoList from '../components/TodoList';
import { RootState } from '../modules';
import TodoInsert from '../components/TodoInsert';

function TodoApp() {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const onInsert = useCallback((text: string) => dispatch(addTodo(text)), [
    dispatch,
  ]);

  const onRemove = useCallback((id: number) => dispatch(removeTodo(id)), [
    dispatch,
  ]);
  const onToggle = useCallback((id: number) => dispatch(toggleTodo(id)), [
    dispatch,
  ]);

  return (
    <>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
}

export default TodoApp;
