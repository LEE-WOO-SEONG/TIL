import React from 'react';
// import CounterContainer from './containers/CounterContainer';
// import TodoApp from './containers/TodoApp';
import GithubProfileLoader from './containers/GithubProfileLoader';
// import Counter from './Counter';
// import ReducerSample from './ReducerSample';
// import { SampleProvider } from './SampleContext';
// import MyForm from './MyForm';

function App() {
  return (
    // <SampleProvider>
    <GithubProfileLoader />
    // </SampleProvider>
  );
  // return <MyForm onSubmit={handleSubmit} />;

  // function handleSubmit(form: { name: string; description: string }) {
  // console.log(form);
  // }
}

export default App;
