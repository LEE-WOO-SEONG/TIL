import { GithubProfile, getUserProfile } from '../api/github';
import { AxiosError } from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

type GithubState = {
  userProfile: {
    loading: boolean;
    data: GithubProfile | null;
    error: Error | null;
  };
};

type GithubAction =
  | ReturnType<typeof getUserProfileRequest>
  | ReturnType<typeof getUserProfileSuccess>
  | ReturnType<typeof getUserProfileError>;

const GET_USER_PROFILE = 'github/GET_USER_PROFILE' as const;
const GET_USER_PROFILE_SUCCESS = 'github/GET_USER_PROFILE_SUCCESS' as const;
const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR' as const;

export const getUserProfileRequest = () => ({ type: GET_USER_PROFILE });
export const getUserProfileSuccess = (profile: GithubProfile) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: profile,
});
export const getUserProfileError = (error: AxiosError) => ({
  type: GET_USER_PROFILE_ERROR,
  payload: error,
});

type SagaAction = ReturnType<typeof getUserProfileRequestSaga>;

// saga function
function* getUserProfileSaga(action: SagaAction) {
  try {
    yield put(getUserProfileRequest());
    const userProfile: GithubProfile = yield call(
      getUserProfile,
      action.payload.username
    );
    yield put(getUserProfileSuccess(userProfile));
  } catch (e) {
    yield put(getUserProfileError(e));
  }
}

// saga action type
const GET_USER_PROFILE_SAGA = 'GET_USER_PROFILE_SAGA' as const;

// saga action creator
export const getUserProfileRequestSaga = (username: string) => ({
  type: GET_USER_PROFILE_SAGA,
  payload: {
    username,
  },
});

// saga function registration
export function* githubSaga() {
  yield takeEvery(GET_USER_PROFILE_SAGA, getUserProfileSaga);
}
