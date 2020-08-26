import React, { CSSProperties } from 'react';
import { Todo } from '../modules/todos';

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: number) => void;
  onRemoveTodo: (id: number) => void;
};

function TodoItem({ todo, onToggleTodo, onRemoveTodo }: TodoItemProps) {
  const handleToggle = () => onToggleTodo(todo.id);
  const handleRemove = () => onRemoveTodo(todo.id);

  const textStyle: CSSProperties = {
    textDecoration: todo.done ? 'line-through' : 'none',
  };

  const removeStyle: CSSProperties = {
    color: 'red',
    marginLeft: 8,
  };

  return (
    <li>
      <span onClick={handleToggle} style={textStyle}>
        {todo.text}
      </span>
      <span onClick={handleRemove} style={removeStyle}>
        (X)
      </span>
    </li>
  );
}

export default TodoItem;
