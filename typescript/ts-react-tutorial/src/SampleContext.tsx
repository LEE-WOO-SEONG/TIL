import React, { createContext, Dispatch, useReducer, useContext } from 'react';

interface SampleCountProps {}

interface SampleProviderProps {
  children: React.ReactNode;
}

interface State {
  count: number;
  text: string;
  color: 'red' | 'orange' | 'yellow';
  isGood: boolean;
}

interface Count {
  type: 'SET_COUNT';
}

interface Text {
  type: 'SET_TEXT';
  text: string;
}

interface Color {
  type: 'SET_COLOR';
  color: State['color'];
}

interface Toggle {
  type: 'TOGGLE_GOOD';
}

function reducer(state: State, action: Count | Text | Color | Toggle): State {
  switch (action.type) {
    case 'SET_COUNT':
      return {
        ...state,
        count: state.count + 1,
      };

    case 'SET_TEXT':
      return {
        ...state,
        text: action.text,
      };

    case 'SET_COLOR':
      return {
        ...state,
        color: action.color,
      };

    case 'TOGGLE_GOOD':
      return {
        ...state,
        isGood: !state.isGood,
      };

    default:
      throw new Error('Unhandled Action');
  }
}

const SampleStateContext = createContext<State | null>(null);
const SampleDispatchContext = createContext<Dispatch<
  Count | Text | Color | Toggle
> | null>(null);

export function SampleProvider({ children }: SampleProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    text: '',
    color: 'red',
    isGood: false,
  });

  return (
    <SampleStateContext.Provider value={state}>
      <SampleDispatchContext.Provider value={dispatch}>
        {children}
      </SampleDispatchContext.Provider>
    </SampleStateContext.Provider>
  );
}

export function useSampleState() {
  const state = useContext(SampleStateContext);
  if (state === null) throw new Error('Cannot find SampleProvider');
  return state;
}

export function useSampleDispatch() {
  const dispatch = useContext(SampleDispatchContext);
  if (dispatch === null) throw new Error('Cannot find SampleProvider');
  return dispatch;
}
