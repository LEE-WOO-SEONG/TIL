import { all } from 'redux-saga/effects';
import { githubSaga } from './githubSaga';

// merge saga functions
export default function* rootSaga() {
  yield all([githubSaga()]);
}
