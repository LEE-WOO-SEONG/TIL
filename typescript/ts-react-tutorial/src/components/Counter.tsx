import React, { useCallback, useRef } from 'react';

type CounterProps = {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onIncreaseBy: (diff: number) => void;
};

function Counter({
  count,
  onIncrease,
  onDecrease,
  onIncreaseBy,
}: CounterProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onIncreaseCustom = useCallback(() => {
    if (inputRef.current === null) return;
    onIncreaseBy(+inputRef.current.value);
    inputRef.current.value = '';
  }, [onIncreaseBy]);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <label htmlFor="input">숫자를 입력 해 주세요</label>
      <input id="input" type="number" ref={inputRef} />
      <button onClick={onIncreaseCustom}>+ you want</button>
    </div>
  );
}

export default Counter;
