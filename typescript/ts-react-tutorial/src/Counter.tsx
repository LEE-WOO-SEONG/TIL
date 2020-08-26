import React, { useState, useReducer } from 'react';

// interface CounterProps = {};

interface Action {
  type: 'INCREASE' | 'DECREASE';
}

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      throw new Error('Unhandled action type');
  }
}

function Counter() {
  // const [count, setCount] = useState<number>(0);

  const [count, dispatch] = useReducer(reducer, 10);

  const increase = (): void => dispatch({ type: 'INCREASE' });
  const decrease = (): void => dispatch({ type: 'DECREASE' });

  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

export default Counter;
