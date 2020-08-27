import { GithubProfile, getUserProfile } from '../api/github';
import { Dispatch } from 'redux';
import { AxiosError } from 'axios';

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

export function getUserProfileThunk(username: string) {
  return async (dispatch: Dispatch) => {
    dispatch(getUserProfileRequest());
    try {
      const userProfile = await getUserProfile(username);
      dispatch(getUserProfileSuccess(userProfile));
    } catch (error) {
      dispatch(getUserProfileError(error));
    }
  };
}

const initialState: GithubState = {
  userProfile: {
    loading: false,
    data: null,
    error: null,
  },
};

function githubReducer(state = initialState, action: GithubAction) {
  switch (action.type) {
    case 'github/GET_USER_PROFILE':
      return {
        ...state,
        userProfile: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case 'github/GET_USER_PROFILE_SUCCESS':
      return {
        ...state,
        userProfile: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case 'github/GET_USER_PROFILE_ERROR':
      return {
        ...state,
        userProfile: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

export default githubReducer;
